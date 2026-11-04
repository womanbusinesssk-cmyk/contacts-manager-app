import { useEffect, useState  , useContext} from "react";
import { useNavigate, useParams } from "react-router";
import { getContact, getGroups } from "../../../../services/contactservices";
import { contactcoutext } from "../../../../context/contactContext";
const ViewContact = () => {
  const { contactid } = useParams();
  const navigate = useNavigate();
  const {loading , Setloading} = useContext(contactcoutext)


  const [state, setState] = useState({
    contact: {},
    group: {},
  });

  useEffect(() => {
    const fetchdata = async () => {
      try {
        Setloading(true);
        const { data: contactData } = await getContact(contactid);
        const { data: groupData } = await getGroups(contactData.group);
            
        
        setState({...state, contact: contactData, group: groupData });
                Setloading(false);
      } catch (err) {
        console.log("خطا در دریافت اطلاعات:", err.message);
      } finally {
        Setloading(false);
      }
    };
    
    if (contactid) fetchdata();
  }, [contactid]);

  if (loading) {
    return <div className="p-8 text-center">در حال بارگذاری اطلاعات...</div>;
  }

 

  const { contact  , group} = state;

    console.log(contact);
    
  return (
    <div className="flex w-full max-w-2xl items-center gap-4 rounded-xl bg-red-100 p-4 max-md:gap-2 max-md:p-2 mt-60">
      <div className="shrink-0 overflow-hidden rounded-lg border-2 border-indigo-500">
        <img
          src={contact.image}
          alt={`${contact.name || ""} ${contact.family || ""}`}
          className="h-40 w-40 object-cover max-md:h-24 max-md:w-24"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 rounded-lg bg-taupe-100 p-4 max-md:p-2">
        <div className="flex min-w-0 items-center gap-2">
          <p className="shrink-0 text-sm font-vazir-black max-md:text-xs">
            نام و نام خانوادگی:
          </p>
          <p className="min-w-0 truncate text-sm font-vazir-test max-md:text-xs">
            {contact.name} {contact.family}
          </p>
        </div>

        <hr className="border-0 border-t-2 border-red-100" />

        <div className="flex min-w-0 items-center gap-2">
          <p className="shrink-0 text-sm font-vazir-black max-md:text-xs">
            شماره موبایل:
          </p>
          <p className="truncate text-sm font-vazir-test max-md:text-xs">
            {contact.tel}
          </p>
        </div>

        <hr className="border-0 border-t-2 border-red-100" />

        <div className="flex min-w-0 items-center gap-2">
          <p className="shrink-0 text-sm font-vazir-black max-md:text-xs">
            آدرس ایمیل:
          </p>
          <p className="min-w-0 truncate text-sm font-vazir-test max-md:text-xs">
            {contact.gmail}
          </p>
        </div>


        <hr className="border-0 border-t-2 border-red-100" />

                <div className="flex min-w-0 items-center gap-2">
          <p className="shrink-0 text-sm font-vazir-black max-md:text-xs">
           گروه : 
          </p>
          <p className="min-w-0 truncate text-sm font-vazir-test max-md:text-xs">
            {group.name}
          </p>
        </div>

      </div>
      

      

      <div className="flex shrink-0 flex-col items-center gap-2">
        <button
          onClick={() => {
            navigate("/contacts");
          }}
          type="button"
          className="rounded-lg bg-orange-300 p-2 text-2xl transition hover:scale-105 hover:bg-orange-400 active:scale-95 max-md:text-lg cursor-pointer"
        >
          <i className="fa-solid fa-arrow-right pointer-events-none"></i>
        </button>
      </div>
    </div>
  );
};

export default ViewContact;
