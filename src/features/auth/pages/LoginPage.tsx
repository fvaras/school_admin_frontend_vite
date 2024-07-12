import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
// import { RadioGroup } from '@radix-ui/react-radio-group';
import { Alert } from '../../../components/ui/alert';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import '../../../styles/auth.scss';
import { useAuth } from '../hooks/useAuth';

const Signin = () => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login, loading, error } = useAuth();

  const onSubmit = async (data: any) => {
    const { username, password,  } = data;
    await login(username, password, 1);
  };

  return (
    <div className="auth-container">
      <div className="row auth-main">
        <div className="col-sm-6 px-0 d-none d-sm-block">
          <div className="left-img" style={{ backgroundImage: 'url(assets/images/pages/logo 2.webp)' }}></div>
        </div>
        <div className="col-sm-6 auth-form-section">
          <div className="form-section">
            <div className="auth-wrapper">
              <h2 className="welcome-msg">{t('LOGIN.TITLE')}</h2>
              <h2 className="login-title">{t('LOGIN.SIGNIN')}</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-12 mb-4">
                    <p className="text-muted">{t('LOGIN.FORM.PROFILE')}</p>
                    {/* <RadioGroup aria-label="Select a profile" {...register('profileId', { required: true })}>
                      // Add Radio buttons here
                    </RadioGroup>
                    {errors.profileId && <Alert variant="destructive">{t('LOGIN.ERRORS.PROFILE')}</Alert>} */}
                  </div>
                  <div className="col-12 mb-2">
                    <Input
                      placeholder={t('LOGIN.FORM.USERNAME')}
                      {...register('username', { required: true })}
                    />
                    {errors.username && <Alert variant="destructive">{t('LOGIN.ERRORS.USERNAME')}</Alert>}
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 mb-2">
                    <Input
                      placeholder={t('LOGIN.FORM.PASSWORD')}
                      type="password"
                      {...register('password', { required: true })}
                    />
                    {errors.password && <Alert variant="destructive">{t('LOGIN.ERRORS.PASSWORD')}</Alert>}
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-5">
                  <div className="form-check"></div>
                  <a className="txt1" href="/authentication/forgot-password">{t('LOGIN.FORGOT_PASSWORD')}</a>
                </div>
                {error && <Alert variant="destructive" className="mt-3 mb-0">{error}</Alert>}
                <div className="container-auth-form-btn">
                  <div style={{ textAlign: 'center' }}>
                    <Button type="submit" disabled={loading}>
                      {loading ? 'Loading...' : 'Login'}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
