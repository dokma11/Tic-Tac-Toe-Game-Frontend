interface FieldProps {
    value?: string;
    onClick: () => void;
    xGreen?: boolean;
    isHistorySelected?: boolean;
}

function Field({ value, onClick, xGreen, isHistorySelected }: FieldProps) {
    return (
        <button
            onClick={ onClick }
            className={ isHistorySelected ? ( (xGreen && value == 'X') || (!xGreen && value == 'Y') ? "w-24 h-24 flex items-center justify-center border-2 border-gray-500 text-4xl font-bold rounded-2xl text-green-600" :
                "w-24 h-24 flex items-center justify-center border-2 border-gray-500 text-4xl font-bold rounded-2xl text-red-600" ) :
                "w-24 h-24 flex items-center justify-center border-2 border-gray-500 text-4xl font-bold rounded-2xl text-gray-600"}
        >
            { value }
        </button>
    );
}

export default Field;
