import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormField,
} from "@/components/ui/form"
import { FormInputField, FormRadioGroupField } from "@/components/ui/custom/forms"
import { useTranslation } from 'react-i18next';
// import { RadioGroup } from '@radix-ui/react-radio-group';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import '../../../styles/auth.scss';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../../../store/slices/authSlice';
import { useEffect, useState } from 'react';
import { UserInfoDTO } from '../../../models/User';
import { ADMINISTRATOR_PROFILE_ID, GUARDIAN_PROFILE_ID, STUDENT_PROFILE_ID, TEACHER_PROFILE_ID } from '@/constants/profile';
import { useAuth } from "../hooks/useAuth"
import { IRadioGroupOption } from "@/components/ui/custom/forms/FormRadioGroupField"

const formSchema = z.object({
  profile: z.string().min(2, { message: "Required" }),
  username: z.string().min(2, { message: "Required" }),
  password: z.string().min(2, { message: "Required" }),
})

const Signin = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [profiles, setProfiles] = useState<{ value: string; label: string }[]>([])

  const { t } = useTranslation();

  const { loading, error, user } = useAppSelector(store => store.auth)

  const { getProfilesArray } = useAuth()

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    setProfiles(getProfilesArray())
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profile: '',
      username: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { username, password, profile } = values
    await dispatch(logIn(username, password, profile));
    setIsSubmitted(true)
  };

  useEffect(() => {
    if (user && isSubmitted)
      handleLoggedUser(user)
  }, [user, isSubmitted])

  // useEffect(() => {
  //   console.log('profile change', form.getValues("profile"))
  // }, [form.getValues("profile")])

  const handleLoggedUser = (user: UserInfoDTO) => {
    switch (user.profileId) {
      case ADMINISTRATOR_PROFILE_ID:
        navigate('/admin/users/all-users');
        break;
      case TEACHER_PROFILE_ID:
        navigate('/teacher/plannings/all-plannings');
        break;
      case STUDENT_PROFILE_ID:
        navigate('/student/homeworks/all-homeworks');
        break;
      case GUARDIAN_PROFILE_ID:
        navigate('/guardian/homeworks/all-homeworks');
        break;
      default:
        navigate('/authentication/signin');
    }
  }

  const handleProfileChange = (option: IRadioGroupOption) => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      switch (option.value) {
        case ADMINISTRATOR_PROFILE_ID:
          form.setValue('username', 'admin')
          form.setValue('password', 'admin')
          break;
        case TEACHER_PROFILE_ID:
          form.setValue('username', 'jpteacher')
          form.setValue('password', 'jpteacher')
          break;
        case STUDENT_PROFILE_ID:
          form.setValue('username', 'lupita')
          form.setValue('password', 'lupita')
          break;
        case GUARDIAN_PROFILE_ID:
          form.setValue('username', 'mdancer')
          form.setValue('password', 'mdancer')
          break;
        default:
      }
    }
  }

  return (
    <div className="auth-container">
      <div
        className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex" style={{ backgroundImage: 'url(assets/images/pages/logo 2.webp)' }}>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">{t('LOGIN.TITLE')}</h1>
              <p className="text-xl text-muted-foreground">{t('LOGIN.SIGNIN')}</p>
            </div>
            <div className="grid gap-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-12 mb-4">
                      <FormField
                        control={form.control}
                        name="profile"
                        render={({ field }) => (
                          <FormRadioGroupField
                            field={field}
                            label={t('LOGIN.FORM.PROFILE')}
                            options={profiles}
                            onOptionClick={handleProfileChange}
                          />
                        )}
                      />
                    </div>
                    <div className="col-12 mb-2">
                      <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                          <FormInputField
                            field={field}
                            label={t('LOGIN.FORM.USERNAME')}
                            placeholder=""
                          />
                        )}
                      />
                    </div>
                    <div className="col-12 mb-2">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormInputField
                            field={field}
                            label={t('LOGIN.FORM.PASSWORD')}
                            type="password"
                          />
                        )}
                      />
                    </div>
                  </div>
                  {/* <div className="d-flex justify-content-between align-items-center mb-5">
                    <div className="form-check"></div>
                    <a className="txt1" href="/authentication/forgot-password">{t('LOGIN.FORGOT_PASSWORD')}</a>
                  </div> */}
                  {error && <Alert variant="destructive" className="mt-3 mb-0">{error}</Alert>}
                  <div className="container-auth-form-btn">
                    <div style={{ textAlign: 'center' }}>
                      <Button type="submit" disabled={loading}>
                        {loading ? 'Loading...' : 'Login'}
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
              {/* <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div> */}
            </div>
            {/* <p className="px-8 text-center text-sm text-muted-foreground">By clicking continue, you
              agree to our <a className="underline underline-offset-4 hover:text-primary"
                href="/terms">Terms of Service</a> and <a
                  className="underline underline-offset-4 hover:text-primary" href="/privacy">Privacy
                Policy</a>.</p> */}
          </div>
        </div>
      </div>
    </div>
  )

  // return (
  //   <div className="auth-container">
  //     <div className="row">

  //       {/* <JsonDataView data={profiles} /> */}

  //       <div className="col-sm-6 px-0 d-none d-sm-block">
  //         <div className="left-img" style={{ backgroundImage: 'url(assets/images/pages/logo 2.webp)' }}></div>
  //       </div>
  //       <div className="col-sm-6">
  //         <div className="form-section">
  //           <div className="auth-wrapper">
  //             <h2 className="welcome-msg">{t('LOGIN.TITLE')}</h2>
  //             <h2 className="login-title">{t('LOGIN.SIGNIN')}</h2>
  //             <Form {...form}>
  //               <form onSubmit={form.handleSubmit(onSubmit)}>
  //                 <div className="row">
  //                   <div className="col-12 mb-4">
  //                     <FormField
  //                       control={form.control}
  //                       name="profile"
  //                       render={({ field }) => (
  //                         <FormRadioGroupField
  //                           field={field}
  //                           label={t('LOGIN.FORM.PROFILE')}
  //                           options={profiles}
  //                           onOptionClick={handleProfileChange}
  //                         />
  //                       )}
  //                     />
  //                   </div>
  //                   <div className="col-12 mb-2">
  //                     <FormField
  //                       control={form.control}
  //                       name="username"
  //                       render={({ field }) => (
  //                         <FormInputField
  //                           field={field}
  //                           label={t('LOGIN.FORM.USERNAME')}
  //                           placeholder=""
  //                         />
  //                       )}
  //                     />
  //                   </div>
  //                   <div className="col-12 mb-2">
  //                     <FormField
  //                       control={form.control}
  //                       name="password"
  //                       render={({ field }) => (
  //                         <FormInputField
  //                           field={field}
  //                           label={t('LOGIN.FORM.PASSWORD')}
  //                           type="password"
  //                         />
  //                       )}
  //                     />
  //                   </div>
  //                 </div>
  //                 <div className="d-flex justify-content-between align-items-center mb-5">
  //                   <div className="form-check"></div>
  //                   <a className="txt1" href="/authentication/forgot-password">{t('LOGIN.FORGOT_PASSWORD')}</a>
  //                 </div>
  //                 {error && <Alert variant="destructive" className="mt-3 mb-0">{error}</Alert>}
  //                 <div className="container-auth-form-btn">
  //                   <div style={{ textAlign: 'center' }}>
  //                     <Button type="submit" disabled={loading}>
  //                       {loading ? 'Loading...' : 'Login'}
  //                     </Button>
  //                   </div>
  //                 </div>
  //               </form>
  //             </Form>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default Signin;
