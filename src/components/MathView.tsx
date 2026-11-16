import React, { useMemo } from 'react';
import katex from 'katex';

interface MathProps {
  math: string;
  block?: boolean;
  className?: string;
}

export const MathView: React.FC<MathProps> = ({ math, block = false, className = '' }) => {
  const html = useMemo(() => {
    try {
      // Strip outer $$ or $ if present for clean direct rendering
      let cleaned = math.trim();
      let isDisplay = block;

      if (cleaned.startsWith('$$') && cleaned.endsWith('$$') && cleaned.length >= 4) {
        cleaned = cleaned.slice(2, -2).trim();
        isDisplay = true;
      } else if (cleaned.startsWith('$') && cleaned.endsWith('$') && cleaned.length >= 2) {
        cleaned = cleaned.slice(1, -1).trim();
      }

      return katex.renderToString(cleaned, {
        displayMode: isDisplay,
        throwOnError: false,
        strict: false,
        output: 'htmlAndMathml',
      });
    } catch (err) {
      console.warn('KaTeX rendering error:', err);
      return math;
    }
  }, [math, block]);

  return (
    <span
      className={`katex-render ${block ? 'block text-center my-2 overflow-x-auto py-1 scrollbar-thin' : 'inline'} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export const MathBlock: React.FC<{ math: string; className?: string }> = ({ math, className = '' }) => {
  return <MathView math={math} block={true} className={className} />;
};

export const MathInline: React.FC<{ math: string; className?: string }> = ({ math, className = '' }) => {
  return <MathView math={math} block={false} className={className} />;
};

/**
 * MathText parses mixed text containing $inline$ and $$display$$ math tokens
 * and renders both regular markdown/prose and visual KaTeX formulas seamlessly.
 */
export const MathText: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  const parts = useMemo(() => {
    if (!text) return [];

    const trimmed = text.trim();
    // Defensive fallback: If text has no dollar signs but is obviously LaTeX, render it directly as math
    if (!text.includes('$') && (trimmed.startsWith('\\') || trimmed.includes('\\begin{') || trimmed.includes('\\frac{') || trimmed.includes('\\lim_') || trimmed.includes('\\sqrt{'))) {
      const isMultiline = trimmed.includes('\\\\') || trimmed.includes('\\begin{');
      return [{ isMath: true, isBlock: isMultiline, content: trimmed, key: 0 }];
    }

    // Split by $$...$$ first, then by $...$
    // Regex matches $$...$$ or $...$
    const regex = /(\$\$[\s\S]+?\$\$|\$[^\$]+?\$)/g;
    const tokens = text.split(regex);

    return tokens.map((token, idx) => {
      if (token.startsWith('$$') && token.endsWith('$$')) {
        const raw = token.slice(2, -2);
        return { isMath: true, isBlock: true, content: raw, key: idx };
      } else if (token.startsWith('$') && token.endsWith('$')) {
        const raw = token.slice(1, -1);
        return { isMath: true, isBlock: false, content: raw, key: idx };
      }
      return { isMath: false, isBlock: false, content: token, key: idx };
    });
  }, [text]);

  return (
    <span className={className}>
      {parts.map((p) => {
        if (p.isMath) {
          return <MathView key={p.key} math={p.content} block={p.isBlock} />;
        }
        return <React.Fragment key={p.key}>{p.content}</React.Fragment>;
      })}
    </span>
  );
};
