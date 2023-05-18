import { Modal } from '~/components';

const LabPFAsReport = ({data}) => {
    let pdf_url = data.google_drive_url;
    let capturedId = pdf_url.match(/\/d\/(.+)\//);
    let gdrive_pdf_viewer = `https://docs.google.com/viewer?srcid=${capturedId[1]}&pid=explorer&efh=false&a=v&chrome=false&embedded=true`;

    return <section className='lab_pfas_report_section'>
        <Modal cancelLink={data?.redirect_page_link} classname="pdf_modal">
            <div className="pdf_container">
                <iframe src={gdrive_pdf_viewer}></iframe>
            </div>
        </Modal>
    </section>
}

export default LabPFAsReport;
