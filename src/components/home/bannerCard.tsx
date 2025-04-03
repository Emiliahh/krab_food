import { LucideIcon } from "lucide-react";

interface DeliveryCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

function FeatureCard({ icon: Icon, title, description }: DeliveryCardProps) {
  return (
    <div className="flex flex-1 items-center gap-4 px-5 py-3  rounded-md shadow right-2">
      <Icon size={35} color="#b5292f" strokeWidth={1.5} />
      <div>
        <h3 className="font-bold text-[15px]">{title}</h3>
        <p className="text-gray-500 text-[14px]">{description}</p>
      </div>
    </div>
  );
}

export default FeatureCard;
