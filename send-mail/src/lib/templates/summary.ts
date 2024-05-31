import { getDataSummary } from '../API/dataSummary';

const apiSummary = new getDataSummary();

export async function completeProdTemplateSummary(name: string, url: string) {
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
        const dataFromApi = await apiSummary.fetchDataSummary();

        const tableRows = dataFromApi.filter((item: {PLANT: string;}) => item.PLANT.startsWith('STITCHING_'))
        .map((item: any, index: number) => {
            return `
            <tr>
                <td width="34.333333333333336%" style="padding: 10px; word-break: break-word; border-top: 2px solid #000000; border-right: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000;">
                    ${item.PLANT}
                </td>
                <td width="33.333333333333336%" style="padding: 10px; word-break: break-word; border-top: 2px solid #000000; border-right: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000;">
                    ${item.TARGET}
                </td>
                <td width="33.333333333333336%" style="padding: 10px; word-break: break-word; border-top: 2px solid #000000; border-right: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000;">
                    ${item.ACTUAL_OUTPUT}
                </td>
            </tr>
            `;
        }).join('');

        const tableRowsS = dataFromApi.filter((item: {PLANT: string;}) => item.PLANT.startsWith('ASSEMBLY_'))
        .map((item: any, index: number) => {
            return `
            <tr>
                <td width="33.333333333333336%" style="padding: 10px; word-break: break-word; border-top: 2px solid #000000; border-right: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000;">
                    ${item.PLANT}
                </td>
                <td width="33.333333333333336%" style="padding: 10px; word-break: break-word; border-top: 2px solid #000000; border-right: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000;">
                    ${item.TARGET}
                </td>
                <td width="33.333333333333336%" style="padding: 10px; word-break: break-word; border-top: 2px solid #000000; border-right: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000;">
                    ${item.ACTUAL_OUTPUT}
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
	<link href="https://fonts.googleapis.com/css2?family=Lato:wght@100;200;300;400;500;600;700;800;900" rel="stylesheet" type="text/css"><!--<![endif]-->
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

			.row-3 .column-1 .block-1.heading_block td.pad {
				padding: 10px 20px !important;
			}

			.row-3 .column-1 .block-1.heading_block h1 {
				font-size: 32px !important;
			}
		}
	</style>
</head>

<body style="background-color: #ffffff; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
	<table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;">
		<tbody>
			<tr>
				<td>
					<table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #d2ddec; border-radius: 0; color: #000000; width: 900px; margin: 0 auto;" width="900">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<div class="spacer_block block-1" style="height:30px;line-height:30px;font-size:1px;">&#8202;</div>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #d2ddec; color: #000000; width: 900px; margin: 0 auto;" width="900">
										<tbody>
											<tr>
												<td class="column column-1" width="41.666666666666664%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: middle; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad" style="padding-left:20px;padding-right:20px;width:100%;">
																<div class="alignment" align="left" style="line-height:10px">
																	<div style="max-width: 93.75px;"><a href="www.example.com" target="_blank" style="outline:none" tabindex="-1"><img src="https://d15k2d11r6t6rl.cloudfront.net/pub/bfra/p9bpqoi4/qot/4fg/1yl/apache-removebg-58.png" style="display: block; height: auto; border: 0; width: 100%;" width="93.75" alt="Placeholder Logo" title="Placeholder Logo" height="auto"></a></div>
																</div>
															</td>
														</tr>
													</table>
												</td>
												<td class="column column-2" width="58.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: middle; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<table class="heading_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad">
																<h1 style="margin: 0; color: #555555; direction: ltr; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; font-size: 20px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 24px;"><em>{{url}} {{currentTime}}</em></h1>
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
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #d2ddec; border-radius: 0; color: #000000; width: 900px; margin: 0 auto;" width="900">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<table class="heading_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad" style="padding-bottom:20px;padding-left:10px;padding-right:10px;padding-top:10px;text-align:center;width:100%;">
																<h1 style="margin: 0; color: #5774cd; direction: ltr; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; font-size: 40px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 48px;"><strong><span class="tinyMce-placeholder">Summary Report</span></strong></h1>
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
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #d2ddec; color: #000000; width: 900px; margin: 0 auto;" width="900">
										<tbody>
											<tr>
												<td class="column column-1" width="50%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<table class="text_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad">
																<div style="font-family: sans-serif">
																	<div class style="font-size: 12px; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2;">
																		<p style="margin: 0; font-size: 16px; text-align: center; mso-line-height-alt: 19.2px;"><em><strong>Stitching</strong></em></p>
																	</div>
																</div>
															</td>
														</tr>
													</table>
													<table class="table_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad">
																<table style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; width: 100%; table-layout: fixed; direction: ltr; background-color: transparent; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; font-weight: 400; color: #000000; text-align: center; letter-spacing: 0px; word-break: break-all;" width="100%">
																	<thead style="vertical-align: top; background-color: #EAEAEA; color: #505659; font-size: 14px; line-height: 120%; text-align: center;">
																		<tr>
																			<th width="33.333333333333336%" style="padding: 10px; word-break: break-word; font-weight: 400; border-top: 2px solid #000000; border-right: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000;"><strong>Plant (</strong><strong>車間</strong><strong>)</strong></th>
																			<th width="33.333333333333336%" style="padding: 10px; word-break: break-word; font-weight: 400; border-top: 2px solid #000000; border-right: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000;"><strong>Target (</strong><strong>目</strong><strong>标</strong><strong>)</strong></th>
																			<th width="33.333333333333336%" style="padding: 10px; word-break: break-word; font-weight: 400; border-top: 2px solid #000000; border-right: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000;"><strong>Actual Output</strong></th>
																		</tr>
																	</thead>
																	<tbody style="vertical-align: top; font-size: 14px; line-height: 120%;">
																		${tableRows}
																	</tbody>
																</table>
															</td>
														</tr>
													</table>
												</td>
												<td class="column column-2" width="50%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<table class="text_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad">
																<div style="font-family: sans-serif">
																	<div class style="font-size: 12px; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2;">
																		<p style="margin: 0; font-size: 16px; text-align: center; mso-line-height-alt: 19.2px;"><em><strong>Assembly</strong></em></p>
																	</div>
																</div>
															</td>
														</tr>
													</table>
													<table class="table_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad">
																<table style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; width: 100%; table-layout: fixed; direction: ltr; background-color: transparent; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; font-weight: 400; color: #000000; text-align: center; letter-spacing: 0px; word-break: break-all;" width="100%">
																	<thead style="vertical-align: top; background-color: #EAEAEA; color: #505659; font-size: 14px; line-height: 120%; text-align: center;">
																		<tr>
																			<th width="33.333333333333336%" style="padding: 10px; word-break: break-word; font-weight: 400; border-top: 2px solid #000000; border-right: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000;"><strong>Plant (</strong><strong>車間</strong><strong>)</strong></th>
																			<th width="33.333333333333336%" style="padding: 10px; word-break: break-word; font-weight: 400; border-top: 2px solid #000000; border-right: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000;"><strong>Target (</strong><strong>目</strong><strong>标</strong><strong>)</strong></th>
																			<th width="33.333333333333336%" style="padding: 10px; word-break: break-word; font-weight: 400; border-top: 2px solid #000000; border-right: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000;"><strong>Actual Output</strong></th>
																		</tr>
																	</thead>
																	<tbody style="vertical-align: top; font-size: 14px; line-height: 120%;">
                                                                        ${tableRowsS}
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
					<table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #d2ddec; border-radius: 0; color: #000000; width: 900px; margin: 0 auto;" width="900">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<div class="spacer_block block-1" style="height:40px;line-height:40px;font-size:1px;">&#8202;</div>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-6" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #142a4b; border-radius: 0; color: #000000; width: 900px; margin: 0 auto;" width="900">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<table class="heading_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad" style="padding-left:20px;padding-right:20px;text-align:center;width:100%;">
																<h1 style="margin: 0; color: #ffffff; direction: ltr; font-family: 'Lato', Tahoma, Verdana, Segoe, sans-serif; font-size: 16px; font-weight: 400; letter-spacing: normal; line-height: 150%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 24px;">APACHE FOOTWEAR VIETNAM <a href="http://www.example.com" target="_blank" style="text-decoration: underline; color: #ffffff;" rel="noopener"></a></h1>
															</td>
														</tr>
													</table>
													<table class="paragraph_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad" style="padding-bottom:20px;padding-left:20px;padding-right:20px;padding-top:10px;">
																<div style="color:#ffffff;direction:ltr;font-family:'Lato', Tahoma, Verdana, Segoe, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:150%;text-align:center;mso-line-height-alt:21px;">
																	<p style="margin: 0;">IT - Software<br>Ext: 1153</p>
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
					<table class="row row-7" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 900px; margin: 0 auto;" width="900">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<table class="empty_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad">
																<div></div>
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
}
