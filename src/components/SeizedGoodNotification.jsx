import { useEffect, useState } from "react";
import { IoNotifications } from "react-icons/io5";

const SERVER_URL = "http://localhost:3000/events";

const SeizedGoodNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const categoriesOfInterest = [1, 2];
    const eventSource = new EventSource(
      `${SERVER_URL}/?categories=${categoriesOfInterest.join(",")}`
    );

    console.log(eventSource);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Event received:", data);

      if (data.type === "new") {
        setNotifications((prev) => [data, ...prev]);
        setUnreadCount((prev) => prev + 1);
      } else if (data.type === "delete") {
        setNotifications((prev) => prev.filter((item) => item.id !== data.id));
      }
    };

    eventSource.onerror = (error) => {
      console.error("SSE connection error:", error);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);

    // Mark all as read when the dropdown is opened
    if (!isDropdownOpen) {
      setUnreadCount(0);
    }
  };

  return (
    <div className="relative">
      {/* Notification Icon */}
      <div
        className="cursor-pointer fixed top-4 right-4 z-20"
        onClick={toggleDropdown}
      >
        <div className="relative">
          <IoNotifications size={30} />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs px-1.5 py-0.5">
              {unreadCount}
            </span>
          )}
        </div>
      </div>

      {/* Dropdown */}
      {isDropdownOpen && (
        <div className="right-4 mt-2 w-80 bg-white shadow-lg border rounded-md z-10">
          <h3 className="font-bold px-4 py-2 border-b">Notifications</h3>
          <ul className="max-h-64 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((item, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 border-b last:border-b-0"
                >
                  <strong>{item.name}</strong>: {item.description} (Category:{" "}
                  {item.category}, Value: ${item.value})
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">No new notifications</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SeizedGoodNotifications;
