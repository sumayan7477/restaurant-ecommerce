
const SectionTItle = ({heading,subHeading}) => {
    return (
        <div className="md:w-6/12 mx-auto text-center my-6">
            <p className="text-amber-200 my-2">---{subHeading}---</p>
            <h3 className="text-3xl uppercase border-y-2 py-4">{heading}</h3>
            
        </div>
    );
};

export default SectionTItle;