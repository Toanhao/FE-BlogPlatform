import * as FaIcons from "react-icons/fa";

interface IconProps {
  name: string;
  size?: number | string;
  color?: string;
  className?: string;
}

export default function Icon({ name, size = 28, color, className }: IconProps) {
  const IconComponent = FaIcons[name as keyof typeof FaIcons];
  if (!IconComponent) return null;
  return <IconComponent size={size} color={color} className={className} />;
}
