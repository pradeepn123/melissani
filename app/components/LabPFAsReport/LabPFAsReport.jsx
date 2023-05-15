import {Modal} from '~/components';
export function LabPFAsReport({data}) {
    return (
      <>
        <section className='lab_pfas_report_section'>
            <Modal cancelLink={data?.page_link} classname="pdf_modal">
                <div className="pdf_container">
                    <iframe src={data?.pdf_url}></iframe>
                </div>
            </Modal>
        </section>
      </>
    )
}