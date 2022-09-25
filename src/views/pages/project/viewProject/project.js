import React from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useLocation } from "react-router-dom";
function keyString(string) {
	const regex = /[a-z]+|[A-Z][a-z]+/g;
	string = string.match(regex).join(' ');
	return string.charAt(0).toUpperCase() + string.slice(1);
}

const Project = ({ match }) => {
	const project = useLocation().state.item;
	const projectId = project._id;

	delete project['_id'];
	delete project['__v'];
	const projectDetails = project ? Object.entries(project) :
		[['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]
	return (
		<CRow className={"d-flex justify-content-center table-responsive"}>
			<CCol lg={8}>
				<CCard>
					<CCardHeader>Project Details: {projectId}</CCardHeader>
					<CCardBody>
						<table className="table table-hover">
							<tbody >
								{
									projectDetails.map(([key, value], index) => {
										key = keyString(key);
										if (typeof value == 'object') {
											return (
												<>
													<tr key={index.toString()} >
														<td rowSpan={value.length} style={{ verticalAlign: "middle" }}>{`${key}:`}</td>
														<td><strong>{`${value[0]}`}</strong></td>
													</tr>
													{
														value.slice(1).map((val, idx) => {
															return (
																<tr key={idx + '$'}>
																	<td key={idx + '$s'}><strong>{val}</strong></td>
																</tr>)
														})
													}
												</>
											)

										}
										else {
											return (
												<tr key={index.toString()} >
													<td>{`${key}:`}</td>
													<td><strong>{value}</strong></td>
												</tr>
											)
										}
									})
								}
							</tbody>
						</table >
					</CCardBody >
				</CCard >
			</CCol >
		</CRow >
	);
};

export default Project;
