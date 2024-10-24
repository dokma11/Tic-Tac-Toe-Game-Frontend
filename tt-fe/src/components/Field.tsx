interface FieldProps {
    value?: string;
    onClick: () => void;
}

function Field({ value, onClick }: FieldProps) {
    return (
        <button
            onClick={onClick}
            className="w-24 h-24 flex items-center justify-center border-2 border-gray-500 text-4xl font-bold rounded-2xl"
        >
            {value}
        </button>
    );
}

export default Field;
