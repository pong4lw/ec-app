type ButtonProps = {
  label: string;
  onClick?: () => void;
};

export const Button = ({ label, onClick }: ButtonProps) => (
  <button
    onClick={onClick}
    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
  >
    {label}
  </button>
);
