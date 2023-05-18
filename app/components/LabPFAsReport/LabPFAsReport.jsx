import { Modal } from '~/components';


const LabPFAsReport = ({data}) => {
    return <section className='lab_pfas_report_section'>
        <Modal cancelLink={data?.page_link} classname="pdf_modal">
            <div className="pdf_container">
                <iframe src={data?.pdf_url.replace("?dl=0","?raw=1")} frameborder="0" allowfullscreen></iframe>
            </div>
        </Modal>
    </section>
}

export default LabPFAsReport;
