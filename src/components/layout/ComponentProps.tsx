import SpotlightCard from "../ui/SpotlightCard";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Field {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'color';
}

interface ComponentPropsEditorProps {
  props: Record<string, any>;
  setProps: (newProps: Record<string, any>) => void;
  fields: Field[];
}

const ComponentProps = ({ props, setProps, fields }: ComponentPropsEditorProps) => {
  const handleChange = (key: string, value: any) => {
    setProps({ ...props, [key]: value });
  };

  return (
    <div className={`absolute right-5 max-w-[250px] ${props['hidden'] ? 'hidden' : ''}`}>
      <SpotlightCard className="custom spotlight-card mx-4 xl:mx-0 z-0" spotlightColor="rgba(84, 181, 255, 0.5)">
        <p className="text-lg font-semibold mb-4">Component Props</p>
        <div className="space-y-3">
          {fields.map(({ name, type }) => (
            <div key={name} className="grid grid-cols-2 gap-2 items-center">
              <label className="text-sm font-medium mb-1 col-span-1">{name}</label>
              <div className="flex justify-end">
              {type === 'boolean' ? (
                <input
                  type="checkbox"
                  checked={props[name]}
                  className="bg-white col-span-1 justify-self-start relative z-10"
                  onChange={(e) => handleChange(name, e.target.checked)}
                />
              ) : type === 'string' ? (
                <textarea
                  value={props[name]}
                  onChange={(e) => handleChange(name, e.target.value)}
                  className="border border-gray-300 bg-white rounded-[8px] px-2 py-1 text-black col-span-1 resize-none relative z-10"
                  rows={2}
                />
              ) : (
                <input
                  type={type === 'color' ? 'color' : 'text'}
                  value={props[name]}
                  onChange={(e) => handleChange(name, type === 'number' ? Number(e.target.value) : e.target.value)}
                  className="border border-gray-300 bg-white rounded-[8px] px-2 py-1 text-black col-span-1 relative z-10"
                />
              )}
              </div>
            </div>
          ))}
        </div>
      </SpotlightCard>
    </div>
  );
};

export default ComponentProps;
