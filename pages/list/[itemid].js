import { useRouter } from 'next/router'

export default List = () => {
    const router = useRouter();
    const { itemid } = router.query;

    console.log(itemid);


    return <p>Post: {itemid}</p>
}