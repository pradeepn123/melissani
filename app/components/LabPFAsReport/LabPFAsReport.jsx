import { Modal } from '~/components';


const LabPFAsReport = ({data}) => {
    return <section className='lab_pfas_report_section'>
        <Modal cancelLink={data?.page_link} classname="pdf_modal">
            <div className="pdf_container">
                <embed className="pdf_viewer" src={data?.pdf_url.replace("?dl=0","?raw=1")} />
            </div>
        </Modal>
    </section>
}

export default LabPFAsReport;
