import { getDataAssembly} from '../API/dataAssembly'

const apiAssembly = new getDataAssembly();

export async function completeProdTemplate(name: string, url: string) {
        
        const templateContent = await prodTemplate();

		const currentTime = new Date();
		const formatTime = `
			${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}, 
			${currentTime.toLocaleDateString("en-GB")}
		`;

        const htmlBody = templateContent
            .replace('{{name}}', name)
            .replace('{{url}}', url)
			.replace('{{currentTime}}', formatTime);

        return htmlBody;
}

async function prodTemplate() {
    try {
        const dataFromApi = await apiAssembly.fetchDataAssembly();

        const tableRows = dataFromApi.map((item: any, index: number) => {
            return `
                <tr>
					<td style="padding: 4px; word-break: break-word; border-top: 2px solid #dddddd; border-right: 2px solid #dddddd; border-bottom: 2px solid #dddddd; border-left: 2px solid #dddddd;">
						${index + 1}
					</td>
					<td style="padding: 5px; word-break: break-word; border-top: 2px solid #dddddd; border-right: 2px solid #dddddd; border-bottom: 2px solid #dddddd; border-left: 2px solid #dddddd;">
						${item.SCAN_DETPT}
					</td>
					<td style="padding: 5px; word-break: break-word; border-top: 2px solid #dddddd; border-right: 2px solid #dddddd; border-bottom: 2px solid #dddddd; border-left: 2px solid #dddddd;">
						${item.TARGET}
					</td>
					<td style="padding: 5px; word-break: break-word; border-top: 2px solid #dddddd; border-right: 2px solid #dddddd; border-bottom: 2px solid #dddddd; border-left: 2px solid #dddddd;">
						${item.TOTAL}
					</td>
					<td style="padding: 5px; word-break: break-word; border-top: 2px solid #dddddd; border-right: 2px solid #dddddd; border-bottom: 2px solid #dddddd; border-left: 2px solid #dddddd;">
						${item.H07}
					</td>
					<td style="padding: 5px; word-break: break-word; border-top: 2px solid #dddddd; border-right: 2px solid #dddddd; border-bottom: 2px solid #dddddd; border-left: 2px solid #dddddd;">
						${item.H08}
					</td>
					<td style="padding: 5px; word-break: break-word; border-top: 2px solid #dddddd; border-right: 2px solid #dddddd; border-bottom: 2px solid #dddddd; border-left: 2px solid #dddddd;">
						${item.H09}
					</td>
					<td style="padding: 5px; word-break: break-word; border-top: 2px solid #dddddd; border-right: 2px solid #dddddd; border-bottom: 2px solid #dddddd; border-left: 2px solid #dddddd;">
						${item.H10}
					</td>
					<td style="padding: 5px; word-break: break-word; border-top: 2px solid #dddddd; border-right: 2px solid #dddddd; border-bottom: 2px solid #dddddd; border-left: 2px solid #dddddd;">
						${item.H11}
					</td>
					<td style="padding: 5px; word-break: break-word; border-top: 2px solid #dddddd; border-right: 2px solid #dddddd; border-bottom: 2px solid #dddddd; border-left: 2px solid #dddddd;">
						${item.H12}
					</td>
					<td style="padding: 5px; word-break: break-word; border-top: 2px solid #dddddd; border-right: 2px solid #dddddd; border-bottom: 2px solid #dddddd; border-left: 2px solid #dddddd;">
						${item.H13}
					</td>
					<td style="padding: 5px; word-break: break-word; border-top: 2px solid #dddddd; border-right: 2px solid #dddddd; border-bottom: 2px solid #dddddd; border-left: 2px solid #dddddd;">
						${item.H14}
					</td>
					<td style="padding: 5px; word-break: break-word; border-top: 2px solid #dddddd; border-right: 2px solid #dddddd; border-bottom: 2px solid #dddddd; border-left: 2px solid #dddddd;">
						${item.H15}
					</td>
					<td style="padding: 5px; word-break: break-word; border-top: 2px solid #dddddd; border-right: 2px solid #dddddd; border-bottom: 2px solid #dddddd; border-left: 2px solid #dddddd;">
						${item.H16}
					</td>
					<td style="padding: 5px; word-break: break-word; border-top: 2px solid #dddddd; border-right: 2px solid #dddddd; border-bottom: 2px solid #dddddd; border-left: 2px solid #dddddd;">
						${item.H17}
					</td>
					<td style="padding: 5px; word-break: break-word; border-top: 2px solid #dddddd; border-right: 2px solid #dddddd; border-bottom: 2px solid #dddddd; border-left: 2px solid #dddddd;">
						${item.H18}
					</td>
					<td style="padding: 5px; word-break: break-word; border-top: 2px solid #dddddd; border-right: 2px solid #dddddd; border-bottom: 2px solid #dddddd; border-left: 2px solid #dddddd;">
						${item.H19}
					</td>
                </tr>
            `;
        }).join('');

	return `
	<!DOCTYPE html>
	<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
	
	<head>
		<title></title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0"><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!-->
		<link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css"><!--<![endif]-->
		<style>
			* {
				box-sizing: border-box;
			}
	
			body {
				margin: 0;
				padding: 0;
			}
	
			a[x-apple-data-detectors] {
				color: inherit !important;
				text-decoration: inherit !important;
			}
	
			#MessageViewBody a {
				color: inherit;
				text-decoration: none;
			}
	
			p {
				line-height: inherit
			}
	
			.desktop_hide,
			.desktop_hide table {
				mso-hide: all;
				display: none;
				max-height: 0px;
				overflow: hidden;
			}
	
			.image_block img+div {
				display: none;
			}
	
			@media (max-width:768px) {
				.desktop_hide table.icons-inner {
					display: inline-block !important;
				}
	
				.icons-inner {
					text-align: center;
				}
	
				.icons-inner td {
					margin: 0 auto;
				}
	
				.mobile_hide {
					display: none;
				}
	
				.row-content {
					width: 100% !important;
				}
	
				.stack .column {
					width: 100%;
					display: block;
				}
	
				.mobile_hide {
					min-height: 0;
					max-height: 0;
					max-width: 0;
					overflow: hidden;
					font-size: 0px;
				}
	
				.desktop_hide,
				.desktop_hide table {
					display: table !important;
					max-height: none !important;
				}
			}
		</style>
	</head>
	
	<body style="background-color: #F5F5F5; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
		<table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #F5F5F5;">
			<tbody>
				<tr>
					<td>
						
						<table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
							<tbody>
								<tr>
									<td>
										<table class="row-content" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; border-radius: 0; color: #333; width: 2000px; margin: 0 auto;" width="2000">
											<tbody>
												<tr>
													<td class="column column-1" width="50%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 15px; padding-left: 25px; padding-top: 15px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
														<table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
															<tr>
																<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
																	<div class="alignment" align="left" style="line-height:10px">
																		<div style="max-width: 106.25px;"><img src="https://d15k2d11r6t6rl.cloudfront.net/pub/bfra/p9bpqoi4/epl/otr/m5o/apache.png" style="display: block; height: auto; border: 0; width: 100%;" width="106.25" alt="Image" title="Image" height="auto"></div>
																	</div>
																</td>
															</tr>
														</table>
													</td>
													<td class="column column-2" width="50%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 25px; padding-right: 25px; padding-top: 25px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
														<table class="heading_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
															<tr>
																<td class="pad">
																	<h1 style="margin: 0; color: #4b7ef3; direction: ltr; font-family: 'Lato', Tahoma, Verdana, Segoe, sans-serif; font-size: 37px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 44.4px;"><span class="tinyMce-placeholder">{{name}}</span></h1>
																</td>
															</tr>
														</table>
														<table class="heading_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
															<tr>
																<td class="pad">
																	<h1 style="margin: 0; color: #57617a; direction: ltr; font-family: 'Lato', Tahoma, Verdana, Segoe, sans-serif; font-size: 17px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 20.4px;"><span class="tinyMce-placeholder">{{url}} {{currentTime}}</span></h1>
																</td>
															</tr>
														</table>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							</tbody>
						</table>
						<table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
							<tbody>
								<tr>
									<td>
										<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #D6E7F0; color: #000000; width: 2000px; margin: 0 auto;" width="2000">
											<tbody>
												<tr>
													<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 60px; padding-left: 25px; padding-right: 25px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
														<table class="table_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
															<tr>
																<td class="pad">
																	<table style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; width: 100%; table-layout: fixed; direction: ltr; background-color: transparent; font-family: 'Lato', Tahoma, Verdana, Segoe, sans-serif; font-weight: 400; color: #000000; text-align: justify; letter-spacing: 0px;" width="100%">
																		<thead style="vertical-align: top; background-color: #EAEAEA; color: #505659; font-size: 15px; line-height: 120%; text-align: left;">
																			<tr>
																				<th width="20%" style="padding: 10px; word-break: break-word; font-weight: 700; border-top: 1px solid #dddddd; border-right: 1px solid #dddddd; border-bottom: 1px solid #dddddd; border-left: 1px solid #dddddd;">Index</th>
																				<th width="30%" style="padding: 10px; word-break: break-word; font-weight: 700; border-top: 1px solid #dddddd; border-right: 1px solid #dddddd; border-bottom: 1px solid #dddddd; border-left: 1px solid #dddddd;">Plant</th>
																				<th width="30%" style="padding: 10px; word-break: break-word; font-weight: 700; border-top: 1px solid #dddddd; border-right: 1px solid #dddddd; border-bottom: 1px solid #dddddd; border-left: 1px solid #dddddd;">Target</th>
																				<th width="30%" style="padding: 10px; word-break: break-word; font-weight: 700; border-top: 1px solid #dddddd; border-right: 1px solid #dddddd; border-bottom: 1px solid #dddddd; border-left: 1px solid #dddddd;">Total</th>
																				<th width="30%" style="padding: 10px; word-break: break-word; font-weight: 700; border-top: 1px solid #dddddd; border-right: 1px solid #dddddd; border-bottom: 1px solid #dddddd; border-left: 1px solid #dddddd;">7:30 - 8:30</th>
																				<th width="30%" style="padding: 10px; word-break: break-word; font-weight: 700; border-top: 1px solid #dddddd; border-right: 1px solid #dddddd; border-bottom: 1px solid #dddddd; border-left: 1px solid #dddddd;">8:30 - 9:30</th>
																				<th width="30%" style="padding: 10px; word-break: break-word; font-weight: 700; border-top: 1px solid #dddddd; border-right: 1px solid #dddddd; border-bottom: 1px solid #dddddd; border-left: 1px solid #dddddd;">9:30 - 10:30</th>
																				<th width="30%" style="padding: 10px; word-break: break-word; font-weight: 700; border-top: 1px solid #dddddd; border-right: 1px solid #dddddd; border-bottom: 1px solid #dddddd; border-left: 1px solid #dddddd;">10:30 - 11:30</th>
																				<th width="30%" style="padding: 10px; word-break: break-word; font-weight: 700; border-top: 1px solid #dddddd; border-right: 1px solid #dddddd; border-bottom: 1px solid #dddddd; border-left: 1px solid #dddddd;">11:30 - 12:30</th>
																				<th width="30%" style="padding: 10px; word-break: break-word; font-weight: 700; border-top: 1px solid #dddddd; border-right: 1px solid #dddddd; border-bottom: 1px solid #dddddd; border-left: 1px solid #dddddd;">12:30 - 13:30</th>
																				<th width="30%" style="padding: 10px; word-break: break-word; font-weight: 700; border-top: 1px solid #dddddd; border-right: 1px solid #dddddd; border-bottom: 1px solid #dddddd; border-left: 1px solid #dddddd;">13:30 - 14:30</th>
																				<th width="30%" style="padding: 10px; word-break: break-word; font-weight: 700; border-top: 1px solid #dddddd; border-right: 1px solid #dddddd; border-bottom: 1px solid #dddddd; border-left: 1px solid #dddddd;">14:30 - 15:30</th>
																				<th width="30%" style="padding: 10px; word-break: break-word; font-weight: 700; border-top: 1px solid #dddddd; border-right: 1px solid #dddddd; border-bottom: 1px solid #dddddd; border-left: 1px solid #dddddd;">15:30 - 16:30</th>
																				<th width="30%" style="padding: 10px; word-break: break-word; font-weight: 700; border-top: 1px solid #dddddd; border-right: 1px solid #dddddd; border-bottom: 1px solid #dddddd; border-left: 1px solid #dddddd;">16:30 - 17:30</th>
																				<th width="30%" style="padding: 10px; word-break: break-word; font-weight: 700; border-top: 1px solid #dddddd; border-right: 1px solid #dddddd; border-bottom: 1px solid #dddddd; border-left: 1px solid #dddddd;">17:30 - 18:30</th>
																				<th width="30%" style="padding: 10px; word-break: break-word; font-weight: 700; border-top: 1px solid #dddddd; border-right: 1px solid #dddddd; border-bottom: 1px solid #dddddd; border-left: 1px solid #dddddd;">18:30 - 19:30</th>
																				<th width="30%" style="padding: 10px; word-break: break-word; font-weight: 700; border-top: 1px solid #dddddd; border-right: 1px solid #dddddd; border-bottom: 1px solid #dddddd; border-left: 1px solid #dddddd;">19:30 - 20:30</th>
																			</tr>
																		</thead>
																		<tbody style="vertical-align: top; text-align: center; font-size: 15px; line-height: 100%;">
																			${tableRows}
																		</tbody>
																	</table>
																</td>
															</tr>
														</table>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							</tbody>
						</table>
						<table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
							<tbody>
								<tr>
									<td>
										<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 900vh; margin: 0 auto;" width="900">
											<tbody>
												<tr>
													<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 60px; padding-top: 20px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
														<table class="divider_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
															<tr>
																<td class="pad">
																	<div class="alignment" align="center">
																		<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="60%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																			<tr>
																				<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px dotted #C4C4C4;"><span>&#8202;</span></td>
																			</tr>
																		</table>
																	</div>
																</td>
															</tr>
														</table>
														<table class="paragraph_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
															<tr>
																<td class="pad">
																	<div style="color:#4F4F4F;font-family:'Lato', Tahoma, Verdana, Segoe, sans-serif;font-size:14px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
																		<p style="margin: 0; word-break: break-word;"><strong>Contact | </strong><u><em>IT - Software</em></u><strong> </strong>| <strong>Ext :&nbsp; </strong>|&nbsp;<em>&nbsp;<span style="background-color: transparent;">1153</span></em></p>
																	</div>
																</td>
															</tr>
														</table>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							</tbody>
						</table>
						<table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;">
							<tbody>
								<tr>
									<td>
										<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 2000px; margin: 0 auto;" width="2000">
											<tbody>
												<tr>
													<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
														<table class="icons_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: center;">
															<tr>
																<td class="pad" style="vertical-align: middle; color: #1e0e4b; font-family: 'Inter', sans-serif; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;">
																	<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																		<tr>
																			<td class="alignment" style="vertical-align: middle; text-align: center;"><!--[if vml]><table align="center" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
																				<!--[if !vml]><!-->
																				<table class="icons-inner" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; margin-right: -4px; padding-left: 0px; padding-right: 0px;" cellpadding="0" cellspacing="0" role="presentation"><!--<![endif]-->
																					<tr>
																						<td style="vertical-align: middle; text-align: center; padding-top: 5px; padding-bottom: 5px; padding-left: 5px; padding-right: 6px;"><a href="http://designedwithbeefree.com/" target="_blank" style="text-decoration: none;"><img class="icon" alt="Beefree Logo" src="https://d1oco4z2z1fhwp.cloudfront.net/assets/Beefree-logo.png" height="auto" width="34" align="center" style="display: block; height: auto; margin: 0 auto; border: 0;"></a></td>
																						<td style="font-family: 'Inter', sans-serif; font-size: 15px; font-weight: undefined; color: #1e0e4b; vertical-align: middle; letter-spacing: undefined; text-align: center;"><a target="_blank" style="color: #1e0e4b; text-decoration: none;">Designed by IT-Software</a></td>
																					</tr>
																				</table>
																			</td>
																		</tr>
																	</table>
																</td>
															</tr>
														</table>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							</tbody>
						</table>
					</td>
				</tr>
			</tbody>
		</table><!-- End -->
	</body>
	
	</html>
`;
	} catch (err) {
		console.log('Error data from API: ', err);
		throw err;
	}

};