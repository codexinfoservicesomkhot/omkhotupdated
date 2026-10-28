import { Sparkles } from "lucide-react";
import { ICONS } from "./bizIconMap.js";

export { ICONS };
export const ICON_CHOICES = Object.keys(ICONS);

export default function BizIcon({ name, size = 18, ...rest }) {
  const Cmp = ICONS[name] || Sparkles;
  return <Cmp size={size} {...rest} />;
}
