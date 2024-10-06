import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../Hooks/UseAuth";
import useAxios from "../../../Hooks/useAxios";
import SectionTItle from "../../../Components/SectionTItle/SectionTItle";

const PaymentHisory = () => {
  const { user } = UseAuth();
  const axiosSequre = useAxios();

  const { data: payments = [] } = useQuery({
    queryKey: ["paymets", user.email],
    queryFn: async () => {
      const res = await axiosSequre.get(`/paymets/${user.email}`);
      return res.data;
    },
  });
  return (
    <div>
      <SectionTItle
        subHeading={"At a Glance!"}
        heading={"PAYMENT HISTORY"}
      ></SectionTItle>

      <div className="overflow-x-auto">
        <p className=" uppercase text-xl">Total Payments: {payments.length}</p>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Email</th>
              <th>Transaction Id</th>
              <th>Total Price</th>
              <th>Payment Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {
                payments.map((payment)=><tr key={payment._id}>
                <th>{payment.email}</th>
                <td>{payment.tranjuscrionId}</td>
                <td>{payment.price }</td>
                <td>{payment.date}</td>
                <td>{payment.status}</td>
              </tr>)
            }
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHisory;
