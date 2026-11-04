import react from "react";
import test2 from "./test2.png";
import { Link } from "react-router";

const Profile_User = ({ Contacts , confirm }) => {

  return (
    <div className="flex w-full max-w-2xl items-center gap-4 rounded-xl bg-red-100 p-4 max-md:gap-2 max-md:p-2">
      <div className="shrink-0 overflow-hidden rounded-lg border-2 border-indigo-500">
        <img
          src={Contacts.image}
          alt={`${Contacts.name} ${Contacts.family}`}
          className="h-40 w-40 object-cover max-md:h-24 max-md:w-24"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 rounded-lg bg-taupe-100 p-4 max-md:p-2">
        <div className="flex min-w-0 items-center gap-2">
          <p className="shrink-0 text-sm font-vazir-black max-md:text-xs">
            نام و نام خانوادگی:
          </p>

          <p className="min-w-0 truncate text-sm font-vazir-test max-md:text-xs">
            {Contacts.name} {Contacts.family}
          </p>
        </div>

        <hr className="border-0 border-t-2 border-red-100" />

        <div className="flex min-w-0 items-center gap-2">
          <p className="shrink-0 text-sm font-vazir-black max-md:text-xs">
            شماره موبایل:
          </p>

          <p className="truncate text-sm font-vazir-test max-md:text-xs">
            {Contacts.tel}
          </p>
        </div>

        <hr className="border-0 border-t-2 border-red-100" />

        <div className="flex min-w-0 items-center gap-2">
          <p className="shrink-0 text-sm font-vazir-black max-md:text-xs">
            آدرس ایمیل:
          </p>

          <p className="min-w-0 truncate text-sm font-vazir-test max-md:text-xs">
            {Contacts.gmail}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-center gap-2">
        <Link
          to={`/contacts/${Contacts.id}`}
          aria-label="مشاهده کاربر"
          className="inline-flex items-center justify-center rounded-lg bg-orange-300 p-2 text-2xl transition hover:scale-105 hover:bg-orange-400 active:scale-95 max-md:text-lg"
        >
          <i className="fa-solid fa-eye pointer-events-none"></i>
        </Link>

        <Link
          to={`/contacts/edit/${Contacts.id}`}
          aria-label="ویرایش کاربر"
          className="inline-flex items-center justify-center rounded-lg bg-blue-300 p-2 text-2xl transition hover:scale-105 hover:bg-blue-400 active:scale-95 max-md:text-lg"
        >
          <i className="fa-solid fa-pen-to-square pointer-events-none"></i>
        </Link>

        <button
          type="button"
          onClick={ confirm}
          aria-label="حذف کاربر"
          className="inline-flex items-center justify-center cursor-pointer rounded-lg bg-red-300 p-2 text-2xl transition hover:scale-105 hover:bg-red-400 active:scale-95 max-md:text-lg"
        >
          <i className="fa-solid fa-xmark pointer-events-none"></i>
        </button>
      </div>
    </div>
  );
};

export default Profile_User;
