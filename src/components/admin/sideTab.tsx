import {
    ChartNoAxesColumnDecreasing,
    CircleArrowLeft,
    // Gift,
    LogOut,
    ShoppingBag,
    Soup,
    User,
    Users,
} from "lucide-react";
import TabIcon from "./tabIcon";
import { useLocation, useNavigate } from "react-router";
import ButtonIcon from "./buttonIcon";
import useUserStore from "@/store/useUser";
import { useQueryClient } from "@tanstack/react-query";
// import { n } from "node_modules/react-router/dist/development/fog-of-war-BjgPfDmv.d.mts";

const tabList = [
    {
        name: "product",
        displayname: "Sản phẩm",
        icon: Soup,
        path: "/",
    },
    {
        name: "order",
        displayname: "Đơn hàng",
        icon: ShoppingBag,
        path: "/order",
    },
    // {
    //   name: "promo",
    //   displayname: "Khuyến mãi",
    //   icon: Gift,
    //   path: "/promo",
    // },
    {
        name: "account",
        displayname: "Tài khoản",
        icon: Users,
        path: "/account",
    },
    {
        name: "static",
        displayname: "Thống kê",
        icon: ChartNoAxesColumnDecreasing,
        path: "/static",
    },
];

function SideTab() {
    const { pathname } = useLocation();
    const queryClient = useQueryClient();
    //lấy địa chỉ hiện tại từ url
    const currentTab = pathname.split("/").pop() || "product";
    //lấy thông tin từ user context
    const { user, logout } = useUserStore();
    const navigate = useNavigate();

    return (
        <div className="flex flex-col w-64 h-screen bg-white border-r border-gray-300 py-4">
            <div className="px-4 mb-2 flex-shrink-0">
                <img
                    className="w-24 "
                    src="https://img.freepik.com/premium-vector/chef-icon-with-tray-food-hand_602006-191.jpg"
                    alt="Chef Icon"
                />
            </div>
            <div className="flex-1 space-y-2 ">
                {tabList.map((tab) => (
                    <TabIcon
                        key={tab.name}
                        Icon={tab.icon}
                        name={tab.displayname}
                        path={tab.path}
                        isFocus={currentTab === tab.name}
                    />
                ))}
            </div>
            <div className="mt-auto flex flex-col space-y-1">
                <ButtonIcon
                    name="Trang chủ"
                    Icon={CircleArrowLeft}
                    onClick={() => navigate("/")}
                />
                <ButtonIcon name={user?.fullname ?? "em sv"} Icon={User} />
                <ButtonIcon
                    name="Đăng xuất"
                    Icon={LogOut}
                    onClick={() => {
                        logout();
                        queryClient.invalidateQueries({
                            queryKey: ["checkAccess"],
                        });
                        navigate("/");
                    }}
                />
            </div>
        </div>
    );
}

export default SideTab;
