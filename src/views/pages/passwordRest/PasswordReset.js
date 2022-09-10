import React from "react";
import {
	CButton,
	CCol,
	CForm,
	CInvalidFeedback,
	CInputCheckbox,
	CFormGroup,
	CLabel,
	CInput,
	CRow,
	CContainer,
	CCard,
} from "@coreui/react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom";
// import Toaster from "src/views/notifications/toaster/Toaster";
import Loader from "../loader/Loader";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// import { useLocation } from "react-router-dom";
import { PasswordRest } from "src/redux/Slice/loginSlice";
const validationSchema = function (values) {
	return Yup.object().shape({
		newPassword: Yup.string()
			.min(6, `Password has to be at least ${6} characters!`)
			.matches(
				/(?=.*\d)(?=.*[a-z]).{6,}/,
				"Password must contain: numbers, uppercase and lowercase letters\n"
			)
			.required("Password is required"),
		confirmPassword: Yup.string()
			.oneOf([values.newPassword], "Passwords must match")
			.required("Password confirmation is required"),
		accept2: Yup.bool()
			.required("* required")
			.test(
				"accept2",
				"You have to check the box!",
				(value) => value === true
			),
	});
};

const validate = (getValidationSchema) => {
	return (values) => {
		const validationSchema = getValidationSchema(values);
		try {
			validationSchema.validateSync(values, { abortEarly: false });
			return {};
		} catch (error) {
			return getErrorsFromValidationError(error);
		}
	};
};

const getErrorsFromValidationError = (validationError) => {
	const FIRST_ERROR = 0;
	return validationError.inner.reduce((errors, error) => {
		return {
			...errors,
			[error.path]: error.errors[FIRST_ERROR],
		};
	}, {});
};





const PasswordReset = () => {
	const userId = useLocation().state;
	console.log("this is user", userId);
	const { isLoading } = useSelector((state) => state.login);
	const dispatch = useDispatch();
	const history = useHistory();
	const onSubmit = (values) => {
		values["id"] = userId;
		dispatch(PasswordRest({ values, history }));
	};
	if (isLoading) {
		return (
			<Loader />
		);
	}
	const initialValues = {
		newPassword: "",
		confirmPassword: "",
		accept2: false,
	};
	return (
		<div className="c-app c-default-layout flex-row align-items-center">
			<CContainer>
				<CRow className="justify-content-center">
					<CCol md="8">
						<CCard className="p-4">
							<Formik
								initialValues={initialValues}
								validate={validate(validationSchema)}
								onSubmit={onSubmit}
							>
								{({
									values,
									errors,
									touched,
									handleChange,
									handleBlur,
									handleSubmit,
									isValid,
									// handleReset,
									// setTouched,
								}) => (
									<CRow>
										<CCol>
											<CForm onSubmit={handleSubmit} noValidate name="simpleForm2">
												<h1>Reset Password</h1>
												<p className="text-muted">Reset Your Password to secure your account</p>
												<CFormGroup>
													<CLabel htmlFor="newPassword">Password</CLabel>
													<CInput
														type="password"
														name="newPassword"
														id="newPassword"
														placeholder="Password"
														autoComplete="new-password"
														valid={!errors.newPassword}
														invalid={touched.newPassword && !!errors.newPassword}
														required
														onChange={handleChange}
														onBlur={handleBlur}
														value={values.newPassword}
													/>
													<CInvalidFeedback>{errors.newPassword}</CInvalidFeedback>
												</CFormGroup>
												<CFormGroup>
													<CLabel htmlFor="confirmPassword">Password</CLabel>
													<CInput
														type="password"
														name="confirmPassword"
														id="confirmPassword"
														placeholder="Confirm password"
														autoComplete="new-password"
														valid={!errors.confirmPassword}
														invalid={
															touched.confirmPassword && !!errors.confirmPassword
														}
														required
														onChange={handleChange}
														onBlur={handleBlur}
														value={values.confirmPassword}
													/>
													<CInvalidFeedback>
														{errors.confirmPassword}
													</CInvalidFeedback>
												</CFormGroup>
												<CFormGroup variant="custom-checkbox" className="pb-3">
													<CInputCheckbox
														custom
														id="accept2"
														required
														valid={!errors.accept2}
														invalid={touched.accept2 && !!errors.accept2}
														onChange={handleChange}
														onBlur={handleBlur}
													/>
													<CLabel variant="custom-checkbox" htmlFor="accept2">
														Confirm?
													</CLabel>
													<CInvalidFeedback>{errors.accept2}</CInvalidFeedback>
												</CFormGroup>
												<CFormGroup>
													<CButton
														type="submit"
														color="primary"
														className="mr-1"
														disabled={!isValid}
													>
														Reset Password
													</CButton>
												</CFormGroup>
											</CForm>
										</CCol>
									</CRow>
								)}
							</Formik>
						</CCard >
					</CCol >
				</CRow >
			</CContainer >
		</div>
	);
};

export default PasswordReset