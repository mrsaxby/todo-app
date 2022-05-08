import { useRouter } from 'next/router'
import todoList from '../../data/todoList.json';

export default function List() {

    const router = useRouter();
    const { itemid } = router.query;

    let result = todoList.filter(item => item.id == itemid);

    return <p>Post: {result.map(e => <div>{e.description}</div>)}</p>
}