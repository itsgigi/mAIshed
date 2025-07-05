import sections from '../components/library/data/HooksSections';

const Hooks = () => {
  return (
    <div className="relative h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      {sections.map((section: { id: string; content: React.ReactNode }) => (
        <div
          key={section.id}
          id={section.id}
          className="snap-start min-h-screen flex flex-col"
        >
          {section.content}
        </div>
      ))}
    </div>
  );
}

export default Hooks