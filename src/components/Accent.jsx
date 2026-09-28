// Renders text where *starred* words get the serif-italic accent style,
// e.g. "Featured *projects*". Use plain() where markup isn't wanted.

const Accent = ({ text }) =>
  String(text)
    .split(/(\*[^*]+\*)/g)
    .map((part, i) =>
      /^\*[^*]+\*$/.test(part) ? <span key={i} className="accent">{part.slice(1, -1)}</span> : part
    );

export const plain = (text) => String(text).replace(/\*([^*]+)\*/g, '$1');

export default Accent;
