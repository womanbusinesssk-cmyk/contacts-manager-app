import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  getAllGroups,
  getContact,
  getGroups,
  updateContact,
} from "../../../../services/contactservices";
import { useNavigate, useParams, Link } from "react-router";

const notify_success = () => toast.success("ثبت با موفقیت انجام شد 😎");
const notify_error = () => toast.error("ثبت  با موفقیت انجام نشد ⚠");

export default function EditContact() {
  const usenavagate = useNavigate();
  const [loading, Setloading] = useState(false);
  const { contactid } = useParams(); // 1

  const [getstate, setstate] = useState({
    contact: {
      name: "",
      family: "",
      tel: "",
      groups: "",
      image: "",
      job: "",
      gmail: "",
    },
    group: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        Setloading(true);
        const { data: contactsData } = await getContact(contactid);

        const { data: groupData } = await getAllGroups();

        setstate({
          ...getstate,
          contact: contactsData,
          group: groupData,
        });
      } catch (err) {
        console.log(err.message);
      } finally {
        Setloading(false);
      }
    };

    fetchData();
  }, []);

  const setcontactinfo = (event) => {
    setstate((prevState) => {
      console.log("خروجی prevState:", prevState); // شیء کامل state قبلی

      return {
        ...prevState, // ۱. کپی کردن کل prevState (شامل contact و group)
        contact: {
          ...prevState.contact, // ۲. کپی کردن مقادیر قبلی داخل contact (نام، تلفن و...)
          [event.target.name]: event.target.value, // ۳. فقط آپدیت فیلدی که تغییر کرده
        },
      };
    });
  };

  const handleCancel = () => {
    setstate({
      contact: {
        name: "",
        family: "",
        tel: "",
        groups: "",
        image: "",
        job: "",
        gmail: "",
      },
      group: [],
    });

    usenavagate("/contacts");
  };
  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await updateContact(getstate.contact, contactid);

      console.log("status:", response.status);

      if (response.status === 200) {
        notify_success();

          handleCancel();
          usenavagate("/contacts");

      }
    } catch (err) {
      console.log(err);
    }
  };

  const contact = getstate.contact;
  const grops = getstate.group;

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 lg:p-8"
      dir="rtl"
    >
      <div className="w-full max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-green-400 mb-8">
            ویرایش مخاطب
          </h1>
          <div className="h-1 w-32 bg-green-400 mx-auto rounded"></div>
        </div>

        {/* Main Container */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left Side - Illustration Area */}
          <div className="hidden lg:flex flex-1 items-center justify-center min-h-96 lg:mt-30">
            <div className="w-full max-w-md h-96 bg-slate-700 bg-opacity-40 rounded-lg flex items-center justify-center border border-slate-600">
              <svg viewBox="0 0 300 300" className="w-full h-full opacity-70">
                <rect x="30" y="200" width="240" height="20" fill="#4a5568" />
                <rect
                  x="60"
                  y="100"
                  width="180"
                  height="100"
                  fill="#5a6b7a"
                  rx="4"
                />
                <ellipse cx="150" cy="80" rx="35" ry="45" fill="#4a5a6a" />
                <circle cx="150" cy="50" r="20" fill="#d4a574" />
                <rect
                  x="125"
                  y="70"
                  width="50"
                  height="45"
                  fill="#d4a574"
                  rx="4"
                />
                <rect
                  x="50"
                  y="60"
                  width="80"
                  height="60"
                  fill="#6b8ba8"
                  rx="4"
                />
                <circle cx="90" cy="85" r="8" fill="#b8a89c" />
                <line
                  x1="40"
                  y1="150"
                  x2="40"
                  y2="180"
                  stroke="#5a6b7a"
                  strokeWidth="3"
                />
                <ellipse cx="35" cy="140" rx="12" ry="20" fill="#4a7c4e" />
                <ellipse cx="45" cy="135" rx="12" ry="20" fill="#4a7c4e" />
              </svg>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="flex-1 w-full lg:min-w-96">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                {/* name */}
                <label className="block text-sm lg:text-base font-medium text-slate-200 mb-3">
                  نام
                </label>
                <input
                  type="text"
                  name="name"
                  value={contact.name}
                  onChange={setcontactinfo}
                  required
                  placeholder="نام کامل خود را وارد کنید"
                  className="w-full px-4 lg:px-5 py-3 lg:py-4 text-base lg:text-lg rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition"
                />
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-sm lg:text-base font-medium text-slate-200 mb-3">
                  نام و نام خانوادگی
                </label>
                <input
                  type="text"
                  name="family"
                  value={contact.family}
                  onChange={setcontactinfo}
                  required
                  placeholder="نام کامل خود را وارد کنید"
                  className="w-full px-4 lg:px-5 py-3 lg:py-4 text-base lg:text-lg rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition"
                />
              </div>

              {/* Photo Address */}
              <div>
                <label className="block text-sm lg:text-base font-medium text-slate-200 mb-3">
                  آدرس تصویر
                </label>
                <input
                  type="url"
                  name="image"
                  value={contact.image}
                  onChange={setcontactinfo}
                  required
                  placeholder="URL تصویر را وارد کنید"
                  className="w-full px-4 lg:px-5 py-3 lg:py-4 text-base lg:text-lg rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition"
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-sm lg:text-base font-medium text-slate-200 mb-3">
                  شماره موبایل
                </label>
                <input
                  type="tel"
                  name="tel"
                  value={contact.tel}
                  onChange={setcontactinfo}
                  required
                  placeholder="شماره موبایل خود را وارد کنید"
                  className="w-full px-4 lg:px-5 py-3 lg:py-4 text-base lg:text-lg rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm lg:text-base font-medium text-slate-200 mb-3">
                  آدرس ایمیل
                </label>
                <input
                  type="email"
                  name="gmail"
                  value={contact.gmail}
                  onChange={setcontactinfo}
                  required
                  placeholder="ایمیل خود را وارد کنید"
                  className="w-full px-4 lg:px-5 py-3 lg:py-4 text-base lg:text-lg rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition"
                />
              </div>

              {/* Job */}
              <div>
                <label className="block text-sm lg:text-base font-medium text-slate-200 mb-3">
                  شغل
                </label>
                <input
                  type="text"
                  name="job"
                  value={contact.job}
                  onChange={setcontactinfo}
                  required
                  placeholder="شغل خود را وارد کنید"
                  className="w-full px-4 lg:px-5 py-3 lg:py-4 text-base lg:text-lg rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition"
                />
              </div>

              {/* Group Selection */}
              <div>
                <label className="block text-sm lg:text-base font-medium text-slate-200 mb-3">
                  انتخاب گروه
                </label>
                <select
                  name="groups"
                  value={contact.groups || ""}
                  onChange={setcontactinfo}
                  required
                  disabled={loading}
                  className="w-full px-4 lg:px-5 py-3 lg:py-4 text-base lg:text-lg rounded-lg bg-slate-700 border border-slate-600 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition appearance-none"
                >
                  <option value="" disabled>
                    {loading ? "در حال بارگذاری..." : "گروه خود را انتخاب کنید"}
                  </option>

                  {grops.length > 0 &&
                    grops.map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 mt-10 lg:mt-12 pt-6 lg:pt-8">
                <Link
                  to={"/contacts"}
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 px-6 lg:px-8 py-3 lg:py-4 text-center  text-base lg:text-lg rounded-lg bg-slate-600 hover:bg-slate-500 text-white font-medium transition duration-200 border border-slate-500"
                >
                  <p className="mt-2"> انصراف</p>
                </Link>
                <button
                  type="submit"
                  className="flex-1 px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-medium transition duration-200 shadow-lg hover:shadow-xl"
                >
                  ویرایش مخاطب
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
