const { createMollieClient } = require('@mollie/api-client');
const mollieClient = createMollieClient({ apiKey: "test_6AVPHyeQADq34cfPN3uUU85EAPrxxh" });

const PaymentComplete = (props) => {
    console.log(props)
    return (
        <div>
            Payment Complete
        </div>
    )
}

export default PaymentComplete


export async function getServerSideProps() {
    // Fetch data from external API
    const data = await req
  
    // Pass data to the page via props
    return { props: { data } }
  }
  
  export default Page