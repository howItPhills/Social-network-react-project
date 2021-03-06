import { Formik, Form } from 'formik'
import TextField from '../Login/formControls/TextField';
import * as Yup from "yup"


const SettingsForm = ({ profileInfo, updateProfile, setEditMode }) => {
   const initialValues = {
      aboutMe: profileInfo.aboutMe,
      lookingForAJob: profileInfo.lookingForAJob,
      lookingForAJobDescription: profileInfo.lookingForAJobDescription,
      fullName: profileInfo.fullName,
      contacts: Object.fromEntries(Object.entries(profileInfo.contacts).map(([key, value]) => [key, value = '']))
   }
   const onSubmit = values => {
      updateProfile(values);
      setEditMode(false)
   }

   const validateUrl = Yup.string().nullable().matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Enter correct url!');


   const validationSchema = Yup.object({
      fullName: Yup.string().required('Required'),
      aboutMe: Yup.string().trim().nullable().required('Required'),
      lookingForAJobDescription: Yup.string().nullable().trim('no spaces').required('Required'),
      contacts: Yup.object(
         Object.fromEntries(Object.entries(profileInfo.contacts).map(([key, value]) => [key, value = validateUrl]))
      )
   })

   return (
      <div>
         <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
         >
            <Form>
               <TextField label="Full name:" name="fullName" type="text" fieldwrapper='fieldWrapper' />
               <TextField label="About me:" name="aboutMe" type="text" fieldwrapper='fieldWrapper' as='textarea' />
               <TextField label="Looking for a job:" name="lookingForAJob" type="checkbox" fieldwrapper='fieldWrapper' />
               <TextField label="Looking for a job description:" name="lookingForAJobDescription" type="text" fieldwrapper='fieldWrapper' as='textarea' />
               <div>Contacts:</div>
               {Object.keys(profileInfo.contacts).map(key => {
                  return <div className='contact' key={key}>
                     {key}: <TextField name={"contacts." + key} type="text" className='contactInput' />
                  </div>
               }
               )}
               <button type="submit" className='submitInfo'>Save</button>
            </Form>
         </Formik>
      </div>
   )
}

export default SettingsForm