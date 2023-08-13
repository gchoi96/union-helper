import { mobileLevelState } from "#store/characterList";
import { useRecoilState } from "recoil";

export default function useMapleM() {
    const [mobileLevel, setMobileLevel] = useRecoilState(mobileLevelState);
    const increase = () => {
        let nextLevel = mobileLevel;
        switch (mobileLevel) {
            case 0:
                nextLevel = 30;
                break;
            case 30:
                nextLevel = 50;
                break;
            case 50:
                nextLevel = 70;
                break;
            case 70:
                nextLevel = 120;
                break;
            case 120:
                nextLevel = 0;
                break;
        }
        setMobileLevel(nextLevel);
    };

    const decrease = () => {
      let nextLevel = mobileLevel;
      switch (mobileLevel) {
          case 0:
              nextLevel = 120;
              break;
          case 30:
              nextLevel = 0;
              break;
          case 50:
              nextLevel = 30;
              break;
          case 70:
              nextLevel = 50;
              break;
          case 120:
              nextLevel = 70;
              break;
      }
      setMobileLevel(nextLevel);
    };
    return { mobileLevel, increase, decrease };
}
