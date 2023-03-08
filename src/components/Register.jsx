import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Tooltip } from './Tooltip';
import { Strings } from '~/config/Strings';
import { useFeatures } from 'flagged';

const Register = () => {
  const form = useRef();
  const [sendingMail, setSendingMail] = useState(false);

  const { darkTheme, classicHeader, testimonialsSection, registerSection } =
    useFeatures();

  const backgroundColorPicker = () => {
    if (testimonialsSection !== registerSection) {
      if (!testimonialsSection) {
        return darkTheme ? 'bg-dark-1' : '';
      }
    }
    return darkTheme ? 'bg-dark-2' : 'bg-light';
  };

  const sendEmail = (event) => {
    event.preventDefault();
    setSendingMail(true);
    // emailjs
    //   .sendForm(
    //     'service_i86k3ms',
    //     'template_si6cin9',
    //     form.current,
    //     'c9HsDgGF0tvWyVnAL'
    //   )
    //   .then(
    //     (result) => {
    //       document.getElementById('contact-form').reset();
    //       toast.success('Message sent successfully!', {
    //         position: 'top-right',
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: darkTheme ? 'dark' : 'light',
    //       });
    //       console.log(result.text);
    //       setSendingMail(false);
    //     },
    //     (error) => {
    //       toast.error('Something went wrong!', {
    //         position: 'top-right',
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: darkTheme ? 'dark' : 'light',
    //       });
    //       console.log(error.text);
    //       setSendingMail(false);
    //     }
    //   );

    const data = {
      name: event.target.name.value,
      email: event.target.email.value,
      phoneNumber: event.target.phoneNumber.value,
      message: event.target.message.value,
    };

    document.getElementById('contact-form').reset();

    toast.success(
      `Message sent successfully! The form contains: ${JSON.stringify(
        data,
        0,
        2
      )}`,
      {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: darkTheme ? 'dark' : 'light',
      }
    );
    setSendingMail(false);
  };

  return (
    <section id="register" className={'section ' + backgroundColorPicker()}>
      <div className={'container ' + (classicHeader ? '' : 'px-lg-5')}>
        {/* Heading */}
        <div className="position-relative d-flex text-center mb-5">
          <h2
            className={
              'text-24  text-uppercase fw-600 w-100 mb-0 ' +
              (darkTheme ? 'text-muted opacity-1' : 'text-light opacity-4')
            }
          >
            {Strings.register.backgroundTitle}
          </h2>
          <p
            className={
              'text-9 text-dark fw-600 position-absolute w-100 align-self-center lh-base mb-0 ' +
              (darkTheme ? 'text-white' : 'text-dark')
            }
          >
            {' '}
            {Strings.register.mainTitle}
            <span className="heading-separator-line border-bottom border-3 border-primary d-block mx-auto" />
          </p>
        </div>
        {/* Heading end*/}
        <div className="row gy-5">
          {/* Register form*/}
          <div className="col-md-8 col-xl-9 mx-auto">
            <h2
              className={
                'mb-3 text-5 text-uppercase text-center text-md-start ' +
                (darkTheme ? 'text-white' : '')
              }
            >
              {Strings.register.formTitle}
            </h2>
            <form
              className={darkTheme ? 'form-dark' : ''}
              id="contact-form"
              // action="php/mail.php"
              // method="post"
              ref={form}
              onSubmit={sendEmail}
            >
              <div className="row g-4">
                <div className="row-xl-6">
                  <input
                    name="name"
                    type="text"
                    className="form-control"
                    required
                    placeholder={Strings.register.placeholders.name}
                    defaultValue={''}
                  />
                </div>
                <div className="col-xl-6">
                  <input
                    name="email"
                    type="email"
                    className="form-control"
                    required
                    placeholder={Strings.register.placeholders.email}
                    defaultValue={''}
                  />
                </div>
                <div className="col-xl-6">
                  <input
                    name="phoneNumber"
                    type="text"
                    className="form-control"
                    required
                    placeholder={Strings.register.placeholders.phoneNumber}
                    defaultValue={''}
                  />
                </div>
                <div className="col">
                  <textarea
                    name="message"
                    className="form-control"
                    rows={5}
                    required
                    placeholder={Strings.register.placeholders.message}
                    defaultValue={''}
                  />
                </div>
              </div>
              <div className="form-check mt-3">
                <input
                  required
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="gdpr-checkbox"
                />
                <label class="form-check-label" for="gdpr-checkbox">
                  <p className="mb-3 mb-lg-0">
                    Sunt de acord cu politica{' '}
                    <a
                      className="fw-500"
                      data-bs-toggle="modal"
                      data-bs-target="#gdpr-policy"
                      href="#gdpr-policy"
                    >
                      GDPR
                    </a>
                  </p>
                </label>
              </div>
              <p className="text-center mt-4 mb-0">
                <button
                  id="submit-btn"
                  className="btn btn-primary rounded-pill d-inline-flex"
                  type="submit"
                >
                  {sendingMail ? (
                    <>
                      <span
                        role="status"
                        aria-hidden="true"
                        class="spinner-border spinner-border-sm align-self-center me-2"
                      ></span>
                      Sending.....
                    </>
                  ) : (
                    <>Send Message</>
                  )}
                </button>
              </p>
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
