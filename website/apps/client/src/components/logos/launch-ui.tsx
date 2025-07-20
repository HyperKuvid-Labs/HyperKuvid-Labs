import Image from "next/image";

interface LaunchUIProps {
  width?: number;
  height?: number;
  className?: string;
}

const LaunchUI = ({ width = 24, height = 24, className, ...props }: LaunchUIProps) => (
  <Image
    src="/logo.jpg"
    alt="HyperKuvid Labs Logo"
    width={width}
    height={height}
    className={className}
    {...props}
  />
);

export default LaunchUI;
