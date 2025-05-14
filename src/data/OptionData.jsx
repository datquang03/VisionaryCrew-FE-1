import { FaVideo, FaUserMd, FaHospitalAlt } from "react-icons/fa";
import { FaMessage, FaPills, FaRobot } from "react-icons/fa6";
import { MdOutlinePayment } from "react-icons/md";
import { IoNewspaper } from "react-icons/io5";

const optionData = [
  {
    id: 1,
    name: "Gọi điện video trực tiếp với bác sĩ",
    description: "Liên hệ khám trực tiếp với bác sĩ",
    navigation: "/video",
    icon: (
      <FaVideo className="text-8xl text-yellow-500 absolute bottom-4 right-4" />
    ),
    bgColor: "bg-yellow-200",
  },
  {
    id: 2,
    name: "Tìm nơi khám gần bạn",
    description: "Đặt lịch khám dễ dàng",
    navigation: "/find",
    icon: (
      <FaHospitalAlt className="text-8xl text-green-600 absolute bottom-4 right-4" />
    ),
    bgColor: "bg-green-200",
  },
  {
    id: 3,
    name: "24/24 Chuẩn đoán với AI",
    description: "Giải đáp vấn đề sức khỏe của bạn ngay lập tức",
    navigation: "/chat/AI",
    icon: (
      <FaRobot className="text-8xl text-pink-500 absolute bottom-4 right-4" />
    ),
    bgColor: "bg-pink-200",
  },
  {
    id: 4,
    name: "Cần hỗ trợ mà không cần phải tốn phí ? ",
    description: "Liên hệ với bác sĩ qua hệ thống tin nhắn",
    navigation: "/chat",
    icon: (
      <FaMessage className="text-8xl text-orange-600 absolute bottom-4 right-4" />
    ),
    bgColor: "bg-orange-200",
  },
  {
    id: 5,
    name: "Thủ tục nhanh, gọn gàng và uy tín",
    description: "Thanh toán qua cổng VNPAY",
    navigation: "/vnpay",
    icon: (
      <MdOutlinePayment className="text-8xl text-purple-600 absolute bottom-4 right-4" />
    ),
    bgColor: "bg-purple-200",
  },
  {
    id: 6,
    name: "Thông tin về thuốc và sức khỏe",
    description: "Thư viện về các loại thực phẩm, thuốc và sức khỏe",
    navigation: "/medicines",
    icon: (
      <FaPills className="text-8xl text-red-600 absolute bottom-4 right-4" />
    ),
    bgColor: "bg-red-200",
  },
  {
    id: 7,
    name: "Về chúng tôi",
    description: "Ấn vào để biết thêm chi tiết",
    navigation: "/about",
    icon: (
      <FaUserMd className="text-8xl text-amber-700 absolute bottom-4 right-4" />
    ),
    bgColor: "bg-amber-200",
  },
  {
    id: 8,
    name: "Blog",
    description: "Đọc tin tức về sức khỏe",
    navigation: "/blog",
    icon: (
      <IoNewspaper className="text-8xl text-cyan-700 absolute bottom-4 right-4" />
    ),
    bgColor: "bg-cyan-200",
  },
];

export default optionData;
