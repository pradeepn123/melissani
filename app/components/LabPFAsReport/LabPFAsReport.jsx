import { Modal } from '~/components';


const LabPFAsReport = ({data}) => {
    return <section className='lab_pfas_report_section'>
        <Modal cancelLink={data?.page_link} classname="pdf_modal">
            <div className="pdf_container">
                <a href={data?.pdf_url.replace("?dl=0","?raw=1")}
                    class="dropbox-embed"
                    data-height="300px"
                    data-width="600px"></a>
            </div>
        </Modal>
    </section>
}

export default LabPFAsReport;
