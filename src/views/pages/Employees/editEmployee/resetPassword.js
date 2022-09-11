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
} from "@coreui/react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom";
import Toaster from "src/views/notifications/toaster/Toaster";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { resetPassword } from "src/redux/Slice/employeesSlice";
const validationSchema = function (values) {
	return Yup.object().shape({
		password: Yup.string()
			.min(6, `Password has to be at least ${6} characters!`)
			.matches(
				/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
				"Password must contain: numbers, uppercase and lowercase letters\n"
			)
			.required("Password is required"),
		confirmPassword: Yup.string()
			.oneOf([values.password], "Passwords must match")
			.required("Password confirmation is required"),
		accept1: Yup.bool()
			.required("* required")
			.test(
				"accept1",
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





const ResetPassword = () => {
	const user = useLocation().state.item;
	const { isScuessfull } = useSelector((state) => state.employees);
	const dispatch = useDispatch();
	const history = useHistory();
	const onSubmit = (values, { setSubmitting }) => {
		values["id"] = user._id;
		dispatch(resetPassword({ values, setSubmitting }));
		// setSubmitting(isSubmitting);
	};
	const initialValues = {
		password: "",
		confirmPassword: "",
		accept1: false,
	};
	return (
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
				isSubmitting,
				isValid,
				handleReset,
				setTouched,
			}) => (
				<CRow>
					<CCol>
						<CForm onSubmit={handleSubmit} noValidate name="simpleForm1">
							<CRow>
								<CCol md={6}>
									<CFormGroup>
										<CLabel htmlFor="password">Password</CLabel>
										<CInput
											type="password"
											name="password"
											id="password"
											placeholder="Password"
											autoComplete="new-password"
											valid={!errors.password}
											invalid={touched.password && !!errors.password}
											required
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.password}
										/>
										<CInvalidFeedback>{errors.password}</CInvalidFeedback>
									</CFormGroup>
								</CCol>
								<CCol md={6}>
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
								</CCol>
							</CRow>
							<CFormGroup variant="custom-checkbox" className="pb-3">
								<CInputCheckbox
									custom
									id="accept1"
									required
									valid={!errors.accept1}
									invalid={touched.accept1 && !!errors.accept1}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
								<CLabel variant="custom-checkbox" htmlFor="accept1">
									Confirm?
								</CLabel>
								<CInvalidFeedback>{errors.accept1}</CInvalidFeedback>
							</CFormGroup>
							<CFormGroup>
								<CButton
									type="submit"
									color="primary"
									className="mr-1"
									disabled={isSubmitting || !isValid}
								>
									{isSubmitting ? "Wait..." : "Submit"}
								</CButton>
							</CFormGroup>
						</CForm>
					</CCol>
				</CRow>
			)}
		</Formik>
	);
};

export default ResetPassword;
