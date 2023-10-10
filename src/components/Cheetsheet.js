import DOMPurify from "dompurify";

function Cheetsheet({ topic, level, content }) {
  const sanitizedHTML = DOMPurify.sanitize(content);

  return (
    <section className="border-l px-12 py-10 flex-auto w-1/4 transition-all overflow-y-auto blur-sm hover:blur-none scrollbar scrollbar-thin scrollbar-thumb-orange-300 scrollbar-track-indigo-50">
      <header>
        <h3 className="text-xl font-bold text-indigo-800 mb-3">Cheetsheet</h3>
        <p className="text-3xl font-bold text-indigo-400 mb-3">{topic}</p>
      </header>
      <div
        className="text-indigo-900 text-lg"
        dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
      />
    </section>
  );
}

export default Cheetsheet;
