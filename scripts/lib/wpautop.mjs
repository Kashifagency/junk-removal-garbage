// Port of WordPress' wpautop(): turns double line breaks into <p> and single ones into <br>.
const BLOCKS =
  '(?:table|thead|tfoot|caption|col|colgroup|tbody|tr|td|th|div|dl|dd|dt|ul|ol|li|pre|form|map|area|blockquote|address|style|p|h[1-6]|hr|fieldset|legend|section|article|aside|hgroup|header|footer|nav|figure|figcaption|details|menu|summary|iframe|video|audio|source|track)';

export function wpautop(text, br = true) {
  if (!text || !text.trim()) return '';
  let pee = text.replace(/\r\n|\r/g, '\n') + '\n';

  // Protect <pre> blocks.
  const pres = [];
  pee = pee.replace(/<pre[\s\S]*?<\/pre>/gi, (m) => {
    pres.push(m);
    return `<pre wp-pre-tag-${pres.length - 1}></pre>`;
  });

  pee = pee.replace(/<br\s*\/?>\s*<br\s*\/?>/gi, '\n\n');
  pee = pee.replace(new RegExp(`(<${BLOCKS}[\\s/>])`, 'gi'), '\n\n$1');
  pee = pee.replace(new RegExp(`(</${BLOCKS}>)`, 'gi'), '$1\n\n');
  pee = pee.replace(/<hr\s*?\/?>/gi, '<hr />\n\n');
  pee = pee.replace(/\n\n+/g, '\n\n');

  const parts = pee.split(/\n\s*\n/).filter((p) => p.trim() !== '');
  pee = parts.map((p) => `<p>${p.replace(/^\n+|\n+$/g, '')}</p>\n`).join('');

  pee = pee.replace(/<p>\s*<\/p>/g, '');
  pee = pee.replace(/<p>([^<]+)<\/(div|address|form)>/gi, '<p>$1</p></$2>');
  pee = pee.replace(new RegExp(`<p>\\s*(</?${BLOCKS}[^>]*>)\\s*</p>`, 'gi'), '$1');
  pee = pee.replace(/<p>(<li.+?)<\/p>/gi, '$1');
  pee = pee.replace(/<p><blockquote([^>]*)>/gi, '<blockquote$1><p>');
  pee = pee.replace(/<\/blockquote><\/p>/gi, '</p></blockquote>');
  pee = pee.replace(new RegExp(`<p>\\s*(</?${BLOCKS}[^>]*>)`, 'gi'), '$1');
  pee = pee.replace(new RegExp(`(</?${BLOCKS}[^>]*>)\\s*</p>`, 'gi'), '$1');

  if (br) {
    pee = pee.replace(/<(script|style)[\s\S]*?<\/\1>/gi, (m) => m.replace(/\n/g, '<WPPreserveNewline />'));
    pee = pee.replace(/(?<!<br \/>)\s*\n/g, '<br />\n');
    pee = pee.replace(/<WPPreserveNewline \/>/g, '\n');
  }
  pee = pee.replace(new RegExp(`(</?${BLOCKS}[^>]*>)\\s*<br />`, 'gi'), '$1');
  pee = pee.replace(/<br \/>(\s*<\/?(?:p|li|div|dl|dd|dt|th|pre|td|ul|ol)[^>]*>)/gi, '$1');
  pee = pee.replace(/\n<\/p>$/g, '</p>');

  pee = pee.replace(/<pre wp-pre-tag-(\d+)><\/pre>/g, (_, i) => pres[+i]);
  return pee.trim();
}
