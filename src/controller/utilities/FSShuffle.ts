

export class FSShuffle {

    //Fisher-Yates shuffle algorithm
    public shuffle(arr: any[]): any {
        let currentIndex = arr.length;
        let temp;
        let randomIndex;

        while (currentIndex != 0) {

            // Pick a random element
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            //swap it with current element
            temp = arr[randomIndex];
            arr[randomIndex] = arr[currentIndex];
            arr[currentIndex] = temp;
        }
        return arr;
    }

}