class Middle
{
    private input : String;
    private output : String;

    constructor()
    {
        this.input = "";
        this.output = "";
    }

    public getInput()
    {
        return this.input;
    }

    public setInput(p_input : String)
    {
        this.input = p_input;
    }

    public getOuput()
    {
        return this.output;
    }

    public setOuput(p_output : String)
    {
        this.output = this.output.concat(p_output.toString());
    }

    public clearOutput()
    {
        this.output = "";
    }

}

export default Middle;