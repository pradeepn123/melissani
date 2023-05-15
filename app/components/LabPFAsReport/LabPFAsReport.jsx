import {Modal} from '~/components';
export function LabPFAsReport({data}) {
    return (
      <>
        <section className='lab_pfas_report_section'>
            <Modal cancelLink={data?.page_link} classname="pdf_modal">
                <div className="pdf_container">
                    {/* <iframe src={data?.pdf_url}></iframe> */}
                    <embed className="pdf_viewer" src={`https://drive.google.com/viewerng/viewer?embedded=true&url=${data?.pdf_url}`} width="500" height="375" />
                </div>
            </Modal>
        </section>
      </>
    )
}