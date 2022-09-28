import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { createUser, getPositions, getToken } from '../api';
import validator from 'validator';

export const WorkingWithPost = ({ userCreated }) => {
  const [name, setName] = useState('');
  const [errorName, setErrorName] = useState(false);
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState(false);
  const [inputedPhone, setInputedPhone] = useState('');
  const [errorPhone, setErrorPhone] = useState(false);
  const appliedPhone = inputedPhone.padEnd(13, 'X');

  const phone = `+38(${appliedPhone.slice(3, 6)}) ${appliedPhone.slice(6, 9)} -
  ${appliedPhone.slice(9, 11)} - ${appliedPhone.slice(11, 13)}`;

  const [position, setPosition] = useState(1);
  const [fileName, setFileName] = useState('Upload your photo');
  const [errorFile, setErrorFile] = useState(false);
  const [formIsValidated, setFormIsValidated] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(false);
  const [positions, setPositions] = useState();
  const [token, setToken] = useState();
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const formData = new FormData();

  const fileField = document.querySelector('input[type="file"]');

  formData.append('position_id', position);
  formData.append('name', name);
  formData.append('email', email);
  formData.append('phone', inputedPhone);

  if (fileField !== null) {
    formData.append('photo', fileField.files[0]);
  }

  useEffect(() => {
    getPositions()
      .then(result => {
        if (result.length > 0) {
          setPositions(result);
        }
      });

    getToken()
      .then(res => {
        setToken(res);
      });
  }, []);

  useEffect(() => {
    if (errorName === false && errorEmail === false && errorPhone === false) {
      setFormIsValidated(true);
    }

    if (name && email && inputedPhone && fileName !== 'Upload your photo') {
      setButtonDisabled(false);
    }
  }, [name, email, inputedPhone, uploadedFile, position]);

  return (
    <section className="workingWithPost">
      <div className="container">
        <h2 className="workingWithPost__title">
          Working with POST request
        </h2>
        <form
          className="workingWithPost__form form"
          onSubmit={(event) => {
            event.preventDefault();
            if (formIsValidated === true) {
              createUser(formData, token);
              setTimeout(() => {
                userCreated();
              }, 1000);
            } else {
              if (errorName) {
                setErrorName(true);
              }

              if (errorEmail) {
                setErrorEmail(true);
              }

              if (errorPhone) {
                setErrorPhone(true);
              }
            }
          }}
        >
          <div className="form__inputBlock">
          <div className='form__inputBlock_item'>
          <input
            className={classNames('form__input', {
              'form__input form__input--error': errorName
            })}
            type="text"
            placeholder="Your name"
            data-placeholder="Your name"
            onChange={(event) => {
              if (name.length > 1 && name.length < 60 && name !== '') {
                setErrorName(false);
              } else {
                setErrorName(true);
              }
              setName(event.target.value);
            }}
          />
          <span className={classNames('form__input-txtLabel', {
            'form__input-txtLabel form__input-txtLabel--error': errorName === true
          })}>Your name</span>
          </div>
          <div className='form__inputBlock_item'>
          <input
            className={classNames('form__input', {
              'form__input form__input--error': errorEmail
            })}
            type="text"
            placeholder="Email"
            onChange={(event) => {
              if (validator.isEmail(email)) {
                setErrorEmail(false);
              } else {
                setErrorEmail(true);
              }
              setEmail(event.target.value);
            }}
          />
          <span className='form__input-txtLabel'>Your email</span>
          </div>
          <div className='form__inputBlock_item'>
          <input
            className={classNames('form__input', {
              'form__input form__input--error': errorPhone
            })}
            placeholder="Phone"
            type="tel"
            maxLength="13"
            value={inputedPhone}
            onClick={() => {
              if (inputedPhone.length === 0) {
                setInputedPhone('+380');
              }
            }}

            onChange={(event) => {
              if (+event.target.value) {
                setInputedPhone(event.target.value);
              }

              if (inputedPhone.length < 3 && inputedPhone.length > 0) {
                setInputedPhone('+380');
              }

              if (event.target.value.length === 13) {
                setErrorPhone(false);
              } else {
                setErrorPhone(true);
              }
            }}
          />
          <label className="form__input-label">
            {phone}
          </label>
          <span className='form__input-txtLabel'>Your phone</span>
          </div>
          </div>
          <div className="form__radioBlock">
          <p className="form__radioBlock_title">
            Select position
          </p>
          {Array.isArray(positions) && (
            positions.map(pos => (
              <React.Fragment key={pos.id + pos.name}>
              <input
                type="radio"
                id={pos.id}
                name={pos.name}
                value={pos.id}
                checked={position === pos.id}
                onChange={(event) => {
                  setPosition(+event.target.value);
                }}
                className="form__input_radio"
              />
              <label
                htmlFor={pos.id}
                className="form__input_radio_label"
              >
                <span
                  className={classNames('form__input_radio_span', {
                    'form__input_radio_span--selected': position === pos.id
                  })}
                >
                </span>
                {pos.name}
              </label>
              </React.Fragment>
            ))
          )}
          </div>

          <div className={classNames('form__fileWrapper', {
            'form__fileWrapper form__fileWrapper--error': errorFile === true
          })}>
          <label
            htmlFor="inputFile"
            data-content={fileName.length > 25
              ? fileName.slice(fileName.lastIndexOf('\\') + 1, 36) + ' ...'
              : fileName.slice(fileName.lastIndexOf('\\') + 1, 36)
            }
            className={classNames('form__fileLabel', {
              'form__fileLabel--uploaded': uploadedFile === true,
              'form__fileLabel form__fileLabel--error': errorFile === true
            })}
            onClick={() => {
              if (fileName === 'Upload your photo') {
                setErrorFile(true);
              } else {
                setErrorFile(false);
              }
            }}
          >
            Upload
            <input
              id="inputFile"
              type="file"
              required
              onChange={(event) => {
                setFileName(event.target.value);
                setUploadedFile(true);
                setErrorFile(false);
              }}
              className="form__fileInput"
            />
          </label>
          </div>
          <button
            className={buttonDisabled === true ? 'button button--disabled' : 'button'}
            disabled={buttonDisabled}
          >
            Sign up
          </button>
        </form>
      </div>
    </section>
  );
};
