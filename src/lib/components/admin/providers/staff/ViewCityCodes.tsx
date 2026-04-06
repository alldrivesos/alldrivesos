
interface ViewCityCodesProps {
    codes: string[];
}

const ViewCityCodes: React.FC<ViewCityCodesProps> = ({ codes }) => {
    return (
        <div>
            <div className="max-h-[400px] overflow-y-auto">
                <div
                    className={`relative flex items-center justify-between p-2 mb-3`}
                >
                    {codes}
                </div>
            </div>
        </div>
    );
};

export default ViewCityCodes;
