import React from "react";
import { useRef, useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const copyText = (text) => {
    toast("🦄 Text Copied!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };

  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const savedata = () => {
    console.log(form);
    setPasswordArray([...passwordArray, {...form, id: uuidv4()}]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]));
    console.log([...passwordArray, form]);
    toast("📔 Password Saved!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setform({ site: "", username: "", password: "" })
  };

  const editdata = (id) => {
    console.log(id);
    if(passwordArray.filter(item=>item.id!==id)[0]){
      console.log("yes");
    }
    setform(passwordArray.filter(item=>item.id===id)[0]);
    setPasswordArray(passwordArray.filter(item=>item.id!==id));
    localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)));
    toast("🖋 Editing Password!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const deletedata = (id) => {
    console.log(id);
    let c = confirm("Do you really want to delete this password?")
    if(c){
      setPasswordArray(passwordArray.filter(item=>item.id!==id));
      localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)));
      toast("❌ Password Deleted!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    
  };

  const showpassword = () => {
    passwordRef.current.type = "text";
    //   alert("show password");
    if (ref.current.src.includes("icons/eyecross.svg")) {
      ref.current.src = "icons/eye.svg";
      passwordRef.current.type = "text";
    } else {
      ref.current.src = "icons/eyecross.svg";
      passwordRef.current.type = "password";
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      <ToastContainer />
      <div className="absolute inset-0 -z-10 max-h w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_1110px_at_100%_10px,#7DDA58,transparent)]"></div>
      </div>
      <div className="p-2 md:p-0 md:mycontainer">
        <h1 className="text-4xl text-center">
          <span className="text-green-700"> &lt;</span>Passward Manager
          <span className="text-green-700">/ &gt; </span>
        </h1>
        <p className="text-green-900 text-center text-lg">
          Your own Password Manager
        </p>
        <div className="text-black flex flex-col p-4 gap-3 items-center">
          <input
            value={form.site}
            onChange={handlechange}
            placeholder="Enter website name or address"
            className="inputstyle"
            type="text"
            name="site"
            id=""
          />
          <div className="flex flex-col md:flex-row md:gap-3 w-full gap-8">
            <input
              value={form.username}
              onChange={handlechange}
              placeholder="Enter Username"
              className="inputstyle"
              name="username"
              type="text"
            />
            <div className="relative">
              <input
                value={form.password}
                ref={passwordRef}
                onChange={handlechange}
                placeholder="Enter Password"
                className="inputstyle"
                type="password"
                name="password"
              />
              <span
                className="absolute right-0 top-0.5 px-1 cursor-pointer"
                onClick={showpassword}
              >
                <img
                  ref={ref}
                  className="w-7 rounded-full hover:opacity-50"
                  src="icons/eye.svg"
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savedata}
            className="flex justify-center items-center bg-green-500 rounded-full w-fit py-2 px-2 hover:bg-green-600"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Add Password
          </button>
        </div>
        <div className="passwords">
          <h1 className="text-green-900 text-center text-lg">Your Passwords</h1>
          {passwordArray.length === 0 && (
            <div className="w-full text-center flex flex-col items-center justify-center">
              <span> No Password To Show </span> <img src="" alt="" />
              <video autoPlay loop className="w-1/4">
                <source src="not.mp4" type="video/mp4" />
              </video>
            </div>
          )}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded overflow-hidden mb-10">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className=" border border-x-green-800 py-2">Site URL</th>
                  <th className=" border border-x-green-800 py-2">Username</th>
                  <th className=" border border-x-green-800 py-2">Password</th>
                  <th className=" border border-x-green-800 py-2">Options</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className=" py-2 border relative border-black text-center w-7/12">
                        <a href={item.site} target="_blank">
                          <span className="text-blue-400 underline hover:text-purple-400">
                            {item.site}
                          </span>
                          <button
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <img
                              className="w-8 absolute top-2.5 right-1 hover:opacity-50"
                              src="./icons/open.svg"
                              alt="open"
                            />
                          </button>
                        </a>
                      </td>
                      <td className=" py-2 border relative border-black text-center w-1/6">
                        <span>{item.username}</span>
                        <button
                          onClick={() => {
                            copyText(item.username);
                          }}
                        >
                          <img
                            className="w-8 absolute top-2.5 right-1 hover:opacity-50"
                            src="./icons/copy.svg"
                            alt="copy"
                          />
                        </button>
                      </td>
                      <td className=" py-2 border relative items-center justify-center border-black text-center w-1/6">
                        <span>{item.password}</span>
                        {/* <button>
                          <img className="w-8 hover:opacity-50" src="./icons/eye.svg" alt="" />
                        </button> */}
                        <button
                          onClick={() => {
                            copyText(item.password);
                          }}
                        >
                          <img
                            className="w-8 absolute top-2.5 right-1 hover:opacity-50"
                            src="./icons/copy.svg"
                            alt="copy"
                          />
                        </button>
                      </td>
                      <td className=" py-2 border border-black text-center w-1/12">
                        <button onClick={()=>{editdata(item.id)}}>
                          <lord-icon
                            src="https://cdn.lordicon.com/gwlusjdu.json"
                            trigger="hover"
                          ></lord-icon>
                          </button>
                        <button onClick={()=>{deletedata(item.id)}}>
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                          ></lord-icon>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
