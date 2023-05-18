import { Modal } from '~/components';

const LabPFAsReport = ({data}) => {
    return <section className='lab_pfas_report_section'>
        <Modal cancelLink={data?.page_link} classname="pdf_modal">
            <div className="pdf_container">
                <iframe src="https://docs.google.com/viewer?srcid=1HxY-Bs0Yz7OzhoP9ugx8sOgfiPm3uKjA&pid=explorer&efh=false&a=v&chrome=false&embedded=true" width="580px" height="480px"></iframe>
            </div>
        </Modal>
    </section>
}

export default LabPFAsReport;
