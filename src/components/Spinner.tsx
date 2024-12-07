interface SpinnerProps {
  size?: number;
  color?: string;
  speed?: string;
}

const Spinner = ({
  size = 8,
  color = "blue-500",
  speed = "spin",
}: SpinnerProps) => {
  return (
    <div
      className="grid place-items-center"
      style={{ height: " calc(100vh - 56px)" }}
    >
      <div
        className={`w-${size} h-${size} border-4 border-${color} border-t-transparent rounded-full animate-${speed}`}
      ></div>
    </div>
  );
};

export default Spinner;
