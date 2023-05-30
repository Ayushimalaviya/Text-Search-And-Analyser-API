
import {Router} from 'express';
const router = Router();
import path from 'path';

router.get('/', (req, res) => {
  const filePath = path.resolve('./static/homepage.html');
  res.sendFile(filePath);
})

  export default router;