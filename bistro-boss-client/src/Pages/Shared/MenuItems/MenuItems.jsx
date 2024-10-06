
const MenuItems = ({item}) => {
    const {image ,price,name,recipe} = item;
    return (
        <div className="flex gap-4">
            <img style={{borderRadius:'0 200px 200px 200px'}} className="w-[80px]" src={image} alt="" />
            <div>
                <h3 className="uppercase">{name}-----------</h3>
                <p className="text-sm text-gray-400">{recipe}</p>
            </div>
            <p className="text-yellow-400">${price}</p>
        </div>
    );
};

export default MenuItems;