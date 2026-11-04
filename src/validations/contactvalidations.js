import * as Yup from "yup";

  const contactSchema = Yup.object().shape({
    name:Yup.string().required("نام الزامی میباشد"),
    family:Yup.string().required("نام و نام خانوادگی الزامی میباشد"),
    image : Yup.string().url("آدرس معتبر نیست ").required("تصویر الزامی میباشد"),
    tel : Yup.number().required("مقدار تلفن را وارد کنید"),
    gmail: Yup.string().email(),
    job : Yup.string().nullable(),
    group : Yup.string().required("انتخاب گروه الزامی میباشد")
})

export default  contactSchema
