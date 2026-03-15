import FormRoot, { FormInput, FormTextArea } from "./form";

const Form = Object.assign(FormRoot, {
  Input: FormInput,
  TextArea: FormTextArea,
});

export default Form;