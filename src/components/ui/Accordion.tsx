import { useState } from "react";

const Accordion = ({ title, content }: { title: string, content: string }) => {
    const [isActive, setIsActive] = useState(false);

    return (
    <>
        <div className="min-w-[150px] max-w-[150px] mx-auto my-4 sm:w-auto text-sm">
            <div
            className="flex flex-row justify-between cursor-pointer bg-white hover:bg-gray-200 p-4 rounded-[16px]"
            onClick={() => setIsActive(!isActive)}
            >
                <div>{title}</div>
                <div>{isActive ? '-' : '+'}</div>
            </div>
            { isActive && (
                <div className="p-2">
                    {content}
                </div>
            )}
        </div>
    </>
    );
};

export default Accordion