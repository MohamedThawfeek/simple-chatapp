import dayjs from "dayjs";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { setMessages } from "../../redux/slice/messages";
import axios from "../../service/axios";
import toast, { Toaster } from "react-hot-toast";
import { setContact, setSelectContact } from "../../redux/slice/contact";
import { setUser } from "../../redux/slice/user";
import { useNavigation } from "react-router-dom";

const socket = io(`${process.env.db_url}`);
const Home = () => {
  const dispatch = useDispatch();
    const navigate = useNavigation();
  const { contact, selectedContact: SelectContact } = useSelector(
    (state) => state.contact
  );

  const { messages } = useSelector((state) => state.message);
  const { user } = useSelector((state) => state.user);

  const [message, setMessage] = useState("");

    const getToken = localStorage.getItem("token");

  useEffect(() => {
    if (!getToken) {
      return navigate("/login");
    }
  }, [getToken]);

  useEffect(() => {
    const API = async () => {
      try {
        const { data } = await axios.get("/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (data.success) {
          dispatch(setUser(data.data));
        }
      } catch (error) {
         navigate("/login");
        toast.error(error.message);
        return 
      }
    };

    API();
  }, []);

  useLayoutEffect(() => {
    socket.on("new message", (msg) => {
      dispatch(setMessages(msg.data));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useLayoutEffect(() => {
    const API = async () => {
      try {
        const { data } = await axios.get("/get-contact", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (data.success) {
          dispatch(setContact(data.data));
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    API();
  }, []);

  useLayoutEffect(() => {
    const API = async () => {
      if (SelectContact) {
        try {
          const { data } = await axios.post(
            "/get-chat",
            { sender_id: SelectContact?._id },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          if (data.success) {
            dispatch(setMessages(data.data));
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    };
    API();
  }, [SelectContact]);

  const selectedContact = async (id) => {
    try {
      const { data } = await axios.post(
        `/get-chat`,
        {
          sender_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (data.success) {
        dispatch(setMessages(data.data));
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const sendMessage = async () => {
    try {
      const { data } = await axios.post(
        `/create-chat`,
        {
          sender_id: SelectContact?._id,
          message: message,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (data.success) {
        setMessage("");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  console.log('SelectContact', SelectContact);
  

  return (
    <div className="w-screen h-screen flex">
      <div className="w-[25%] h-full p-3 border-r-[2px] border-gray-300 flex flex-col gap-4">
        <h1 className="text-[22px] font-bold ">Contacts</h1>
        <input
          type="text"
          placeholder="Search..."
          className="outline-none w-full border-[1px] border-gray-300 py-1 px-2 rounded-xl "
        />
        <div className="w-full h-[1px] bg-gray-300"></div>

        <div className="w-full h-full overflow-auto">
          {contact.map((item, index) => {
            return (
              <div
                onClick={() => {
                  dispatch(setSelectContact(item));
                  selectedContact(item._id);
                }}
                key={index}
                className={`w-full h-[65px] overflow-hidden px-1 flex items-center cursor-pointer hover:bg-gray-100 rounded-lg ${
                  SelectContact?._id === item._id && "bg-gray-200"
                }`}
              >
                <img
                  src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg"
                  alt=""
                  className="w-[40px] h-[40px] rounded-full object-cover"
                />
                <div className="ml-[13px] w-full">
                  <div className="flex items-center justify-between w-full">
                    <h1 className="text-[18px] font-bold">
                      {item?.email.slice(0, 13)}
                    </h1>
                    <p className="text-gray-600 text-[10px]">
                      {dayjs(item?.active_time).format("DD/MM/YY hh:mm A")}
                    </p>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <p className="text-gray-600">Hello</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {SelectContact ? (
        <div className="w-[75%] h-full flex flex-col">
          <div className="w-full h-[10%] flex items-center px-3">
            <img
              src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg"
              alt=""
              className="w-[40px] h-[40px] rounded-full object-cover"
            />
            <div className="ml-[13px] w-full">
              <h1 className="text-[16px] font-bold">{SelectContact?.email}</h1>
              <p className="text-gray-600 text-[12px]">{dayjs(SelectContact?.active_time).format("DD/MM/YY hh:mm A")}</p>
            </div>
          </div>
          <div className="w-full flex justify-end p-3 gap-3 flex-col h-[80%] bg-[url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5J6ukAGV8Tkm0fKmfSOl1wrORDtygCXm5Ktp4VTd46GCqhfvO1Hp7yff687lroEBEHLk&usqp=CAU)] overflow-auto">
            {messages?.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`w-full flex flex-col ${
                    item.user_id === user._id ? "items-end" : "items-start"
                  }`}
                >
                  <div className="w-[200px] rounded-lg min-h-[50px] bg-green-200 relative p-2">
                    <p className="text-[10px] text-gray-400">{user.email}</p>
                    <p className="text-[14px]">{item?.message}</p>
                    <p className="absolute text-[10px] text-end text-gray-400 bottom-0 right-1">
                      {dayjs(item?.createdAt).format("hh:mm A")}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-full h-[10%] flex items-center px-2 gap-4">
            <input
              className="flex-1 py-2 px-6 outline-none border-[1px] border-gray-300 rounded-full"
              placeholder="Enter your message"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />
            <IoMdSend size={25} onClick={sendMessage} />
          </div>
        </div>
      ) : <div className="w-[75%] h-full flex items-center justify-center bg-[url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5J6ukAGV8Tkm0fKmfSOl1wrORDtygCXm5Ktp4VTd46GCqhfvO1Hp7yff687lroEBEHLk&usqp=CAU)] ">
        </div>}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default Home;
